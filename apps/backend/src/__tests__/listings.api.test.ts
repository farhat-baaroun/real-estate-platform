import request from 'supertest';
import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { buildServer } from '../server';

const app = buildServer();

/** Request `Cookie` header value from `Set-Cookie` response header(s). */
function cookieHeaderFromSetCookie(setCookie: string | string[] | undefined): string {
  if (!setCookie) return '';
  const lines = Array.isArray(setCookie) ? setCookie : [setCookie];
  return lines.map((line) => line.split(';')[0]?.trim()).filter(Boolean).join('; ');
}

describe('Listings API', () => {
  /** One SuperTokens session for the whole file — avoids rate limits / flakes from many signups on CI. */
  let authCookie: string;

  beforeAll(async () => {
    await app.ready();
    const signup = await request(app.server).post('/auth/signup').send({
      email: `listings-api-test-${randomUUID()}@example.com`,
      password: 'P@ssword123',
    });
    expect(signup.status).toBe(200);
    authCookie = cookieHeaderFromSetCookie(signup.headers['set-cookie']);
    expect(authCookie.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await app.prisma.listing.deleteMany();
  });

  it('GET /listings returns empty list', async () => {
    const response = await request(app.server).get('/listings');

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
    expect(response.body.meta.currentPage).toBe(1);
  });

  it('POST /listings creates a listing', async () => {
    const response = await request(app.server).post('/listings').set('Cookie', authCookie).send({
      title: 'Downtown Loft',
      price: 230000,
      bedrooms: 2,
    });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Downtown Loft');
    expect(response.body.status).toBe('draft');
  });

  it('POST /listings with invalid body returns 422', async () => {
    const response = await request(app.server).post('/listings').set('Cookie', authCookie).send({
      title: '',
      price: 0,
      bedrooms: -1,
    });

    expect(response.status).toBe(422);
  });

  it('POST /listings/{id}/publish publishes a listing', async () => {
    const created = await request(app.server).post('/listings').set('Cookie', authCookie).send({
      title: 'Townhouse',
      price: 410000,
      bedrooms: 4,
    });

    const response = await request(app.server)
      .post(`/listings/${created.body.id}/publish`)
      .set('Cookie', authCookie)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('published');
  });

  it('POST /listings returns 401 without cookie', async () => {
    const response = await request(app.server).post('/listings').send({
      title: 'No Auth',
      price: 123000,
      bedrooms: 1,
    });

    expect(response.status).toBe(401);
  });

  it('GET /auth/session works with cookie', async () => {
    const response = await request(app.server).get('/auth/session').set('Cookie', authCookie);

    expect(response.status).toBe(200);
    expect(response.body.userId).toBeTypeOf('string');
  });
});
