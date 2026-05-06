import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Fastify, { type FastifyInstance } from 'fastify';

vi.mock('../src/auth.js', () => ({
  verifyJwt: vi.fn(async (token: string) => {
    if (token === 'valid') return { sfdc_user_id: 'user-1' };
    throw new Error('bad token');
  }),
  bearerFromReq: vi.fn((req: { headers: Record<string, string> }) => {
    const h = req.headers['authorization'];
    if (!h?.startsWith('Bearer ')) throw new Error('no bearer');
    return h.slice('Bearer '.length);
  }),
}));

const yieldedFrames: Array<{ id: string; frame: { type: string; data: unknown } }> = [];
let yieldFinished: () => void = () => {};

vi.mock('../src/bus.js', () => ({
  bus: { ping: vi.fn(async () => 'PONG'), quit: vi.fn(), duplicate: vi.fn() },
  busSub: { quit: vi.fn() },
  publishToUser: vi.fn(),
  enqueueForWorker: vi.fn(),
  userStream: (id: string) => `chat:user:${id}`,
  // eslint-disable-next-line require-yield
  readUserStream: vi.fn(async function* () {
    for (const f of yieldedFrames) yield f;
    await new Promise<void>((resolve) => {
      yieldFinished = resolve;
    });
  }),
}));

let app: FastifyInstance;

beforeEach(async () => {
  yieldedFrames.length = 0;
  const { sseRoute } = await import('../src/sse.js');
  app = Fastify({ logger: false });
  await app.register(sseRoute);
  await app.ready();
});

afterEach(async () => {
  yieldFinished();
  await app.close();
  vi.clearAllMocks();
});

describe('GET /sse', () => {
  it('rejects missing Authorization header with 401', async () => {
    const res = await app.inject({ method: 'GET', url: '/sse' });
    expect(res.statusCode).toBe(401);
  });

  it('rejects invalid JWT with 401', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/sse',
      headers: { authorization: 'Bearer bad' },
    });
    expect(res.statusCode).toBe(401);
  });

  it('opens SSE response with text/event-stream and writes frames', async () => {
    yieldedFrames.push({
      id: '1-0',
      frame: { type: 'token', data: { messageId: 'm1', delta: 'hi' } },
    });
    yieldedFrames.push({
      id: '2-0',
      frame: { type: 'message_complete', data: { messageId: 'm1', tokens: 1 } },
    });

    const res = await app.inject({
      method: 'GET',
      url: '/sse',
      headers: { authorization: 'Bearer valid' },
      payloadAsStream: true,
    });

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toContain('text/event-stream');

    let buffer = '';
    const stream = res.stream();
    for await (const chunk of stream) {
      buffer += String(chunk);
      if (buffer.includes('event: message_complete')) {
        stream.destroy();
        break;
      }
    }

    expect(buffer).toContain('id: 1-0');
    expect(buffer).toContain('event: token');
    expect(buffer).toContain('"delta":"hi"');
    expect(buffer).toContain('id: 2-0');
    expect(buffer).toContain('event: message_complete');
  }, 5000);
});
