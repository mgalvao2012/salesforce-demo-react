import pino from 'pino';
import {
  ackInbox,
  bus,
  busSub,
  publishToUser,
  readInbox,
  type WorkerJob,
} from './bus.js';
import { appendMessage, closePool, loadHistory, migrate } from './db.js';
import { streamChat } from './llm.js';
import { buildPrompt } from './prompt.js';
import { publishFinalizedMessage } from './sfdc.js';

const logger = pino({ level: process.env.LOG_LEVEL ?? 'info' });

const CONSUMER_GROUP = process.env.CONSUMER_GROUP ?? 'llm';
const CONSUMER_NAME = process.env.CONSUMER_NAME ?? `${CONSUMER_GROUP}-${process.pid}`;
const HISTORY_LIMIT = Number(process.env.HISTORY_LIMIT ?? 20);

async function handleJob(job: WorkerJob, signal: AbortSignal): Promise<void> {
  const userMessageId = job.messageId;
  const assistantMessageId = `asst-${userMessageId}`;
  const startedAt = new Date();

  // 1. Persist the user's turn (idempotent).
  await appendMessage({
    conversationId: job.conversationId,
    messageId: userMessageId,
    role: 'user',
    content: job.content,
  });

  // 2. Build the prompt from prior history + new user turn.
  const history = await loadHistory(job.conversationId, HISTORY_LIMIT);
  // Drop the just-inserted user turn; we add it explicitly via buildPrompt.
  const priorHistory = history.filter((_, i) => i !== history.length - 1);
  const prompt = buildPrompt(priorHistory, job.content);

  // 3. Stream the assistant response, publishing token deltas as they arrive.
  let assistantText = '';
  let tokens = 0;
  try {
    const result = await streamChat(
      prompt,
      {
        onDelta: async (delta) => {
          assistantText += delta;
          await publishToUser(job.userId, {
            type: 'token',
            data: { messageId: assistantMessageId, delta },
          });
        },
      },
      signal,
    );
    tokens = result.tokens;
  } catch (err) {
    const message = (err as Error).message;
    logger.error({ err: message, conversationId: job.conversationId }, 'llm stream failed');
    await publishToUser(job.userId, {
      type: 'error',
      data: { code: 'llm_error', message },
    });
    return;
  }

  // 4. Finalize: persist + emit message_complete + fan out to Salesforce.
  await appendMessage({
    conversationId: job.conversationId,
    messageId: assistantMessageId,
    role: 'assistant',
    content: assistantText,
  });

  await publishToUser(job.userId, {
    type: 'message_complete',
    data: { messageId: assistantMessageId, tokens },
  });

  // Fire-and-forget Salesforce Platform Events for both turns. We log on
  // failure but do not block the chat UX on it.
  void publishFinalizedMessage({
    conversationExternalId: job.conversationId,
    messageExternalId: userMessageId,
    userId: job.userId,
    role: 'user',
    content: job.content,
    tokenCount: 0,
    createdAt: startedAt,
  }).catch((err) =>
    logger.warn({ err: (err as Error).message, messageId: userMessageId }, 'sfdc publish failed'),
  );
  void publishFinalizedMessage({
    conversationExternalId: job.conversationId,
    messageExternalId: assistantMessageId,
    userId: job.userId,
    role: 'assistant',
    content: assistantText,
    tokenCount: tokens,
    createdAt: new Date(),
  }).catch((err) =>
    logger.warn({ err: (err as Error).message, messageId: assistantMessageId }, 'sfdc publish failed'),
  );
}

const ac = new AbortController();
let inFlight = 0;

const shutdown = async (signal: string): Promise<never> => {
  logger.info({ signal }, 'shutting down');
  ac.abort();
  const deadline = Date.now() + 25_000;
  while (inFlight > 0 && Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 50));
  }
  await Promise.allSettled([bus.quit(), busSub.quit(), closePool()]);
  process.exit(0);
};
process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));

await migrate();
logger.info(
  {
    CONSUMER_GROUP,
    CONSUMER_NAME,
    GEMINI_MODEL: process.env.GEMINI_MODEL ?? 'gemini-2.5-flash',
    HISTORY_LIMIT,
  },
  'llm-worker starting',
);

try {
  for await (const { id, job } of readInbox(CONSUMER_GROUP, CONSUMER_NAME, ac.signal)) {
    inFlight += 1;
    void (async () => {
      try {
        await handleJob(job, ac.signal);
      } catch (err) {
        logger.error({ err: (err as Error).message, jobId: id }, 'job handler crashed');
        try {
          await publishToUser(job.userId, {
            type: 'error',
            data: { code: 'worker_crash', message: (err as Error).message },
          });
        } catch (publishErr) {
          logger.error({ err: (publishErr as Error).message }, 'failed to publish error frame');
        }
      } finally {
        try {
          await ackInbox(CONSUMER_GROUP, id);
        } catch (ackErr) {
          logger.error({ err: (ackErr as Error).message, jobId: id }, 'XACK failed');
        }
        inFlight -= 1;
      }
    })();
  }
  logger.error({}, 'main loop exited (this should not happen)');
} catch (err) {
  logger.error({ err: (err as Error).message, stack: (err as Error).stack }, 'main loop threw');
  process.exit(1);
}
