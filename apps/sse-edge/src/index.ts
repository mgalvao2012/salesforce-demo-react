import Fastify from 'fastify';
import cors from '@fastify/cors';
import { sseRoute } from './sse.js';
import { sendRoute } from './send.js';
import { healthRoutes } from './health.js';
import { metricsRoute } from './metrics.js';
import { bus, busSub } from './bus.js';

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? '').split(',').map((o) => o.trim()).filter(Boolean);
if (allowedOrigins.length === 0) {
  throw new Error('ALLOWED_ORIGINS is required (comma-separated list)');
}

const app = Fastify({ logger: { level: process.env.LOG_LEVEL ?? 'info' } });

await app.register(cors, {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type', 'Last-Event-ID'],
  credentials: false,
});

await app.register(healthRoutes);
await app.register(metricsRoute);
await app.register(sseRoute);
await app.register(sendRoute);

const port = Number(process.env.PORT ?? 3000);
await app.listen({ port, host: '0.0.0.0' });
app.log.info({ port, allowedOrigins }, 'sse-edge listening');

const shutdown = async (signal: string): Promise<never> => {
  app.log.info({ signal }, 'shutting down');
  await app.close();
  await Promise.allSettled([bus.quit(), busSub.quit()]);
  process.exit(0);
};
process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));
