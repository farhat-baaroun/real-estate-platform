import type { FastifyInstance } from 'fastify';
import { convertToRecipeUserId } from 'supertokens-node';
import type { SessionRequest } from 'supertokens-node/framework/fastify';
import { wrapRequest, wrapResponse } from 'supertokens-node/framework/fastify';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Session from 'supertokens-node/recipe/session';
import { z } from 'zod';

import { verifySessionPreHandler } from '../auth/verify-session';

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

    await Session.createNewSession(
      wrapRequest(request),
      wrapResponse(reply),
      'public',
      convertToRecipeUserId(result.user.id),
    );
    return { userId: result.user.id };
  });

  app.post('/auth/signin', async (request, reply) => {
    const payload = signInSchema.parse(request.body);
    const result = await EmailPassword.signIn('public', payload.email, payload.password);

    if (result.status !== 'OK') {
      return reply.status(401).send({ error: 'INVALID_CREDENTIALS', message: result.status });
    }

    await Session.createNewSession(
      wrapRequest(request),
      wrapResponse(reply),
      'public',
      convertToRecipeUserId(result.user.id),
    );
    return { userId: result.user.id };
  });

  app.post('/auth/signout', { preHandler: verifySessionPreHandler }, async (request: SessionRequest) => {
    await request.session!.revokeSession();
    return { ok: true };
  });

  app.get('/auth/session', { preHandler: verifySessionPreHandler }, async (request: SessionRequest) => {
    const userId = request.session!.getUserId();
    return { userId };
  });
}
