import type { FastifyReply, FastifyRequest } from 'fastify';
import { randomUUID } from 'node:crypto';

const SESSION_COOKIE = 'sAccessToken';
const sessions = new Map<string, string>();

export function createSession(reply: FastifyReply, userId: string): string {
  const token = randomUUID();
  sessions.set(token, userId);
  reply.setCookie(SESSION_COOKIE, token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
  });
  return token;
}

export function revokeSession(request: FastifyRequest, reply: FastifyReply): void {
  const token = request.cookies[SESSION_COOKIE];
  if (token) {
    sessions.delete(token);
  }
  reply.clearCookie(SESSION_COOKIE, { path: '/' });
}

export function getSessionUserId(request: FastifyRequest): string | undefined {
  const token = request.cookies[SESSION_COOKIE];
  if (!token) return undefined;
  return sessions.get(token);
}
