import pino from 'pino';
import { ackInbox, bus, busSub, publishToUser, readInbox, type WorkerJob } from './bus.js';
import { chunkForStream } from './tokenize.js';

const logger = pino({ level: process.env.LOG_LEVEL ?? 'info' });

const CONSUMER_GROUP = process.env.CONSUMER_GROUP ?? 'echo';
const CONSUMER_NAME = process.env.CONSUMER_NAME ?? `${CONSUMER_GROUP}-${process.pid}`;
const TOKEN_DELAY_MS = Number(process.env.ECHO_TOKEN_DELAY_MS ?? 40);
const PREFIX = process.env.ECHO_PREFIX ?? 'You said: ';

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

async function handleJob(job: WorkerJob): Promise<void> {
  const replyMessageId = `echo-${job.messageId}`;
  const reply = `${PREFIX}${job.content}`;
  const chunks = chunkForStream(reply);

  for (const delta of chunks) {
    await publishToUser(job.userId, {
      type: 'token',
      data: { messageId: replyMessageId, delta },
    });
    if (TOKEN_DELAY_MS > 0) await sleep(TOKEN_DELAY_MS);
  }

  await publishToUser(job.userId, {
    type: 'message_complete',
    data: { messageId: replyMessageId, tokens: chunks.length },
  });
}

const ac = new AbortController();
let inFlight = 0;

const shutdown = async (signal: string): Promise<never> => {
  logger.info({ signal }, 'shutting down');
  ac.abort();
  // Heroku gives ~30s to drain; wait briefly for in-flight jobs.
  const deadline = Date.now() + 25_000;
  while (inFlight > 0 && Date.now() < deadline) {
    await sleep(50);
  }
  await Promise.allSettled([bus.quit(), busSub.quit()]);
  process.exit(0);
};
process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));

logger.info(
  { CONSUMER_GROUP, CONSUMER_NAME, TOKEN_DELAY_MS },
  'echo-worker starting',
);

for await (const { id, job } of readInbox(CONSUMER_GROUP, CONSUMER_NAME, ac.signal)) {
  inFlight += 1;
  void (async () => {
    try {
      await handleJob(job);
    } catch (err) {
      logger.error({ err: (err as Error).message, jobId: id }, 'job failed');
      try {
        await publishToUser(job.userId, {
          type: 'error',
          data: { code: 'echo_worker_error', message: (err as Error).message },
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
