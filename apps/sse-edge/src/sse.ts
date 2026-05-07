import type { FastifyPluginAsync } from 'fastify';
import { verifyJwt, bearerFromReq } from './auth.js';
import { readUserStream } from './bus.js';
import { gauges, counters } from './metrics.js';

const HEARTBEAT_MS = Number(process.env.HEARTBEAT_MS ?? 15000);
const BACKPRESSURE_THRESHOLD = 64 * 1024;
const ALLOWED_ORIGINS = new Set(
  (process.env.ALLOWED_ORIGINS ?? '').split(',').map((o) => o.trim()).filter(Boolean),
);

export const sseRoute: FastifyPluginAsync = async (app) => {
  app.get('/sse', async (req, reply) => {
    let userId: string;
    try {
      const claims = await verifyJwt(bearerFromReq(req));
      userId = claims.sfdc_user_id;
    } catch (err) {
      counters.authFailures.inc();
      req.log.warn({ err: (err as Error).message }, 'auth failed');
      return reply.code(401).send();
    }

    const lastEventId =
      typeof req.headers['last-event-id'] === 'string' ? req.headers['last-event-id'] : '';
    if (lastEventId) counters.reconnects.inc();

    // We bypass Fastify's reply pipeline by writing directly to reply.raw,
    // which means @fastify/cors hooks don't run on this response. Echo the
    // CORS headers manually so the browser doesn't reject the stream.
    const origin = req.headers.origin;
    const corsHeaders: Record<string, string> =
      typeof origin === 'string' && ALLOWED_ORIGINS.has(origin)
        ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' }
        : {};

    reply.raw.writeHead(200, {
      ...corsHeaders,
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    });
    reply.raw.flushHeaders();

    gauges.sseConnectionsOpen.inc();
    const ac = new AbortController();
    req.raw.on('close', () => ac.abort());

    const writeFrame = (id: string, event: string, data: unknown): void => {
      reply.raw.write(`id: ${id}\nevent: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
      counters.framesOut.inc({ type: event });
    };
    const writePing = (): void => {
      reply.raw.write(`: ping\n\n`);
    };

    const heartbeat = setInterval(writePing, HEARTBEAT_MS);

    try {
      for await (const { id, frame } of readUserStream(userId, lastEventId, ac.signal)) {
        const congested = (reply.raw as unknown as { writableLength: number }).writableLength
          > BACKPRESSURE_THRESHOLD;
        if (congested && frame.type === 'token') {
          counters.framesDropped.inc({ type: frame.type });
          continue;
        }
        writeFrame(id, frame.type, frame.data);
      }
    } catch (err) {
      req.log.error({ err }, 'sse stream error');
    } finally {
      clearInterval(heartbeat);
      gauges.sseConnectionsOpen.dec();
      reply.raw.end();
    }
  });
};
