import { Redis } from 'ioredis';
import type { ChatFrame } from '@chat/protocol';

const redisUrl = process.env.REDIS_URL ?? 'redis://localhost:6379';
const useTls = redisUrl.startsWith('rediss://');

export const bus = new Redis(redisUrl, {
  ...(useTls ? { tls: { rejectUnauthorized: false } } : {}),
  maxRetriesPerRequest: null,
  enableReadyCheck: true,
});

export const busSub = bus.duplicate();

bus.on('error', (err) => {
  process.stderr.write(`[redis bus] ${err.message}\n`);
});
busSub.on('error', (err) => {
  process.stderr.write(`[redis busSub] ${err.message}\n`);
});

export const userStream = (userId: string) => `chat:user:${userId}`;
export const WORKER_INBOX = 'chat:worker-inbox';
const STREAM_MAXLEN = 1000;

interface PublishedFrame {
  type: ChatFrame['type'];
  data: ChatFrame['data'];
}

export async function publishToUser(userId: string, frame: PublishedFrame): Promise<string> {
  const id = await bus.xadd(
    userStream(userId),
    'MAXLEN',
    '~',
    STREAM_MAXLEN,
    '*',
    'payload',
    JSON.stringify(frame),
  );
  return id ?? '';
}

export interface WorkerJob {
  userId: string;
  conversationId: string;
  messageId: string;
  content: string;
}

export interface InboxEntry {
  id: string;
  job: WorkerJob;
}

export async function* readInbox(
  consumerGroup: string,
  consumerName: string,
  signal: AbortSignal,
): AsyncGenerator<InboxEntry> {
  // Best-effort consumer group creation; ignore BUSYGROUP if it already exists.
  try {
    await bus.call(
      'XGROUP',
      'CREATE',
      WORKER_INBOX,
      consumerGroup,
      '$',
      'MKSTREAM',
    );
  } catch (err) {
    const msg = (err as Error).message;
    if (!msg.includes('BUSYGROUP')) throw err;
  }

  while (!signal.aborted) {
    const res = (await busSub.call(
      'XREADGROUP',
      'GROUP',
      consumerGroup,
      consumerName,
      'COUNT',
      '10',
      'BLOCK',
      '5000',
      'STREAMS',
      WORKER_INBOX,
      '>',
    )) as Array<[string, Array<[string, string[]]>]> | null;

    if (!res) continue;

    for (const [, entries] of res) {
      for (const [id, fields] of entries) {
        const payloadIdx = fields.indexOf('payload');
        if (payloadIdx === -1) continue;
        const raw = fields[payloadIdx + 1];
        if (!raw) continue;
        try {
          yield { id, job: JSON.parse(raw) as WorkerJob };
        } catch {
          await ackInbox(consumerGroup, id);
        }
      }
    }
  }
}

export async function ackInbox(consumerGroup: string, id: string): Promise<void> {
  await bus.call('XACK', WORKER_INBOX, consumerGroup, id);
}
