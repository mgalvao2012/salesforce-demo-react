import type { FastifyPluginAsync } from 'fastify';
import { Registry, Gauge, Counter, collectDefaultMetrics } from 'prom-client';

export const registry = new Registry();
collectDefaultMetrics({ register: registry });

export const gauges = {
  sseConnectionsOpen: new Gauge({
    name: 'sse_connections_open',
    help: 'Currently open SSE connections',
    registers: [registry],
  }),
};

export const counters = {
  reconnects: new Counter({
    name: 'sse_reconnects_total',
    help: 'Total client reconnects (inferred from new connects with Last-Event-Id)',
    registers: [registry],
  }),
  framesOut: new Counter({
    name: 'sse_frames_out_total',
    help: 'Total SSE frames written to clients',
    labelNames: ['type'],
    registers: [registry],
  }),
  framesDropped: new Counter({
    name: 'sse_frames_dropped_total',
    help: 'Frames dropped under client backpressure',
    labelNames: ['type'],
    registers: [registry],
  }),
  authFailures: new Counter({
    name: 'sse_auth_failures_total',
    help: 'JWT verification failures',
    registers: [registry],
  }),
};

export const metricsRoute: FastifyPluginAsync = async (app) => {
  app.get('/metrics', async (_req, reply) => {
    reply.header('Content-Type', registry.contentType);
    return registry.metrics();
  });
};
