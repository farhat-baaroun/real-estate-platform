import type { FastifyReply, FastifyRequest } from 'fastify';

import { getSessionUserId } from './session';

export async function requireAuth(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const userId = getSessionUserId(request);
  if (!userId) {
    reply.status(401).send({ error: 'UNAUTHORIZED', message: 'Authentication required' });
  }
}
