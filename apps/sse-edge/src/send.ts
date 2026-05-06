import type { FastifyPluginAsync } from 'fastify';
import { randomUUID } from 'node:crypto';
import { verifyJwt, bearerFromReq } from './auth.js';
import { enqueueForWorker } from './bus.js';
import { counters } from './metrics.js';
import type { SendMessageRequest, SendMessageResponse } from '@chat/protocol';

const MAX_CONTENT_LENGTH = 8000;

export const sendRoute: FastifyPluginAsync = async (app) => {
  app.post<{ Body: SendMessageRequest; Reply: SendMessageResponse | { error: string } }>(
    '/send',
    async (req, reply) => {
      let userId: string;
      try {
        const claims = await verifyJwt(bearerFromReq(req));
        userId = claims.sfdc_user_id;
      } catch (err) {
        counters.authFailures.inc();
        req.log.warn({ err: (err as Error).message }, 'auth failed on /send');
        return reply.code(401).send({ error: 'unauthorized' });
      }

      const { conversationId, content } = req.body ?? ({} as SendMessageRequest);
      if (
        typeof conversationId !== 'string' ||
        conversationId.length === 0 ||
        conversationId.length > 64
      ) {
        return reply.code(400).send({ error: 'invalid conversationId' });
      }
      if (typeof content !== 'string' || content.length === 0 || content.length > MAX_CONTENT_LENGTH) {
        return reply.code(400).send({ error: 'invalid content' });
      }

      const messageId = randomUUID();
      await enqueueForWorker({ userId, conversationId, messageId, content });
      return { messageId };
    },
  );
};
