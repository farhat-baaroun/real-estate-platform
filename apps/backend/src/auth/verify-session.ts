import type { FastifyReply, FastifyRequest } from 'fastify';
import { verifySession } from 'supertokens-node/recipe/session/framework/fastify';

/**
 * SuperTokens' Fastify `verifySession()` typings assume `SessionRequest`, which
 * conflicts with Fastify's generic `preHandler` hook typing. This keeps
 * runtime behavior identical while satisfying `tsc`.
 */
export const verifySessionPreHandler = verifySession() as (
  request: FastifyRequest,
  reply: FastifyReply,
) => Promise<void>;
