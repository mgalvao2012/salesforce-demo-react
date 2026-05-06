import { Redis } from 'ioredis';
import type { ChatFrame } from '@chat/protocol';

const redisUrl = process.env.REDIS_URL ?? 'redis://localhost:6379';
const useTls = redisUrl.startsWith('rediss://');

export const bus = new Redis(redisUrl, {
  ...(useTls ? { tls: {} } : {}),
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

interface WorkerEnqueue {
  userId: string;
  conversationId: string;
  messageId: string;
  content: string;
}

export async function enqueueForWorker(payload: WorkerEnqueue): Promise<void> {
  await bus.xadd(WORKER_INBOX, 'MAXLEN', '~', 10000, '*', 'payload', JSON.stringify(payload));
}

export interface StreamFrame {
  id: string;
  frame: PublishedFrame;
}

export async function* readUserStream(
  userId: string,
  lastId: string,
  signal: AbortSignal,
): AsyncGenerator<StreamFrame> {
  let cursor = lastId || '$';
  while (!signal.aborted) {
    const res = (await busSub.call(
      'XREAD',
      'COUNT',
      '100',
      'BLOCK',
      '5000',
      'STREAMS',
      userStream(userId),
      cursor,
    )) as Array<[string, Array<[string, string[]]>]> | null;

    if (!res) continue;

    for (const [, entries] of res) {
      for (const [id, fields] of entries) {
        cursor = id;
        const payloadIdx = fields.indexOf('payload');
        if (payloadIdx === -1) continue;
        const raw = fields[payloadIdx + 1];
        if (!raw) continue;
        yield { id, frame: JSON.parse(raw) as PublishedFrame };
      }
    }
  }
}
