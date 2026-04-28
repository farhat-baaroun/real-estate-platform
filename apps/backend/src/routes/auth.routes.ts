import type { FastifyInstance } from 'fastify';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import { z } from 'zod';

import { requireAuth } from '../auth/require-auth';
import { createSession, getSessionUserId, revokeSession } from '../auth/session';

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function registerAuthRoutes(app: FastifyInstance): Promise<void> {
  app.post('/auth/signup', async (request, reply) => {
    const payload = signUpSchema.parse(request.body);
    const result = await EmailPassword.signUp('public', payload.email, payload.password);

    if (result.status !== 'OK') {
      return reply.status(422).send({ error: 'SIGNUP_FAILED', message: result.status });
    }

    createSession(reply, result.user.id);
    return { userId: result.user.id };
  });

  app.post('/auth/signin', async (request, reply) => {
    const payload = signInSchema.parse(request.body);
    const result = await EmailPassword.signIn('public', payload.email, payload.password);

    if (result.status !== 'OK') {
      return reply.status(401).send({ error: 'INVALID_CREDENTIALS', message: result.status });
    }

    createSession(reply, result.user.id);
    return { userId: result.user.id };
  });

  app.post('/auth/signout', { preHandler: requireAuth }, async (request, reply) => {
    revokeSession(request, reply);
    return { ok: true };
  });

  app.get('/auth/session', { preHandler: requireAuth }, async (request) => {
    const userId = getSessionUserId(request)!;
    return { userId };
  });
}
