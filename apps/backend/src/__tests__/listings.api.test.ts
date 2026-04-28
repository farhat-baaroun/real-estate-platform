import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { buildServer } from '../server';

const app = buildServer();

async function signUpAndGetCookie() {
  const response = await request(app.server).post('/auth/signup').send({
    email: `user-${Date.now()}@example.com`,
    password: 'P@ssword123',
  });
  return response.headers['set-cookie'];
}

describe('Listings API', () => {
  beforeAll(async () => {
    await app.ready();
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
    const cookie = await signUpAndGetCookie();
    const response = await request(app.server).post('/listings').set('Cookie', cookie ?? '').send({
      title: 'Downtown Loft',
      price: 230000,
      bedrooms: 2,
    });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Downtown Loft');
    expect(response.body.status).toBe('draft');
  });

  it('POST /listings with invalid body returns 422', async () => {
    const cookie = await signUpAndGetCookie();
    const response = await request(app.server).post('/listings').set('Cookie', cookie ?? '').send({
      title: '',
      price: 0,
      bedrooms: -1,
    });

    expect(response.status).toBe(422);
  });

  it('POST /listings/{id}/publish publishes a listing', async () => {
    const cookie = await signUpAndGetCookie();
    const created = await request(app.server).post('/listings').set('Cookie', cookie ?? '').send({
      title: 'Townhouse',
      price: 410000,
      bedrooms: 4,
    });

    const response = await request(app.server)
      .post(`/listings/${created.body.id}/publish`)
      .set('Cookie', cookie ?? '')
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
    const cookie = await signUpAndGetCookie();
    const response = await request(app.server).get('/auth/session').set('Cookie', cookie ?? '');

    expect(response.status).toBe(200);
    expect(response.body.userId).toBeTypeOf('string');
  });
});
