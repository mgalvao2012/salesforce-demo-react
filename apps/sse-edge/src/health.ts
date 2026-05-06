import type { FastifyPluginAsync } from 'fastify';
import { bus } from './bus.js';

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get('/healthz', async () => ({ ok: true }));

  app.get('/readyz', async (_req, reply) => {
    try {
      const pong = await bus.ping();
      if (pong !== 'PONG') {
        return reply.code(503).send({ ok: false, reason: 'redis ping returned ' + pong });
      }
      return { ok: true };
    } catch (err) {
      return reply.code(503).send({ ok: false, reason: (err as Error).message });
    }
  });
};
