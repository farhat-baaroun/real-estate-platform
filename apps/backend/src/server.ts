import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import { PrismaClient } from '@prisma/client';
import { DomainError } from '@real-estate/domain';
import Fastify, { type FastifyInstance } from 'fastify';
import { errorHandler as superTokensErrorHandler, plugin as superTokensPlugin } from 'supertokens-node/framework/fastify';
import { ZodError } from 'zod';

import { initSuperTokens } from './auth/supertokens';
import { registerAuthRoutes } from './routes/auth.routes';
import { registerListingRoutes } from './routes/listings.routes';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export function buildServer(): FastifyInstance {
  const app = Fastify();
  const prisma = new PrismaClient();
  initSuperTokens();

  app.decorate('prisma', prisma);
  const isProd = process.env.NODE_ENV === 'production';
  const corsAllowed = process.env.CORS_ALLOWED_ORIGINS?.split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  const corsOrigin = !isProd ? true : corsAllowed && corsAllowed.length > 0 ? corsAllowed : false;
  app.register(cors, { origin: corsOrigin });
  app.register(cookie);
  app.register(superTokensPlugin);
  app.get('/health', async () => ({ status: 'ok' }));
  app.register(registerAuthRoutes);
  app.register(registerListingRoutes);
  const stErrorHandler = superTokensErrorHandler();
  app.setErrorHandler(async (error, _request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(422).send({ error: 'VALIDATION_ERROR', message: error.message });
    }
    if (error instanceof DomainError) {
      return reply.status(422).send({ error: 'DOMAIN_ERROR', message: error.message });
    }
    await stErrorHandler(error, _request, reply);
    if (reply.sent) {
      return;
    }
    if (error instanceof Error) {
      app.log.error(error);
    }
    return reply.status(500).send({ error: 'INTERNAL_SERVER_ERROR', message: 'Unexpected error' });
  });

  app.addHook('onClose', async () => {
    await prisma.$disconnect();
  });

  return app;
}
