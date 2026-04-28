import type { FastifyInstance } from 'fastify';
import type { Listing as ListingModel } from '@prisma/client';

import { requireAuth } from '../auth/require-auth';
import { ListingRepository } from '../infrastructure/repositories/listing.repository';
import {
  createListingSchema,
  getListingsQuerySchema,
  listingIdParamSchema,
  updateListingSchema,
} from '../schemas/listing.schema';
import { getListings, publishListing } from '../use-cases';

export async function registerListingRoutes(app: FastifyInstance): Promise<void> {
  const listingRepository = new ListingRepository(app.prisma);

  app.get('/listings', async (request) => {
    const parsed = getListingsQuerySchema.parse(request.query);
    const result = await getListings(listingRepository, {
      filter: parsed.filter,
      page: parsed.page,
      limit: parsed.limit,
      sort: parsed.sort,
    });

    return {
      data: result.data.map((row: ListingModel) => ({
        ...row,
        createdAt: row.createdAt.toISOString(),
      })),
      meta: result.meta,
    };
  });

  app.post('/listings', { preHandler: requireAuth }, async (request, reply) => {
    const payload = createListingSchema.parse(request.body);
    const created = await listingRepository.create(payload);
    return reply.status(201).send({
      ...created,
      createdAt: created.createdAt.toISOString(),
    });
  });

  app.get('/listings/:id', async (request, reply) => {
    const { id } = listingIdParamSchema.parse(request.params);
    const listing = await listingRepository.findById(id);
    if (!listing) {
      return reply.status(404).send({ error: 'NOT_FOUND', message: 'Listing not found' });
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    };
  });

  app.patch('/listings/:id', { preHandler: requireAuth }, async (request, reply) => {
    const { id } = listingIdParamSchema.parse(request.params);
    const payload = updateListingSchema.parse(request.body);
    const listing = await listingRepository.findById(id);
    if (!listing) {
      return reply.status(404).send({ error: 'NOT_FOUND', message: 'Listing not found' });
    }
    if (listing.status !== 'draft') {
      return reply.status(422).send({ error: 'INVALID_STATE', message: 'Cannot modify listing when status is PUBLISHED' });
    }

    const updated = await listingRepository.update(id, payload);
    return {
      ...updated,
      createdAt: updated.createdAt.toISOString(),
    };
  });

  app.post('/listings/:id/publish', { preHandler: requireAuth }, async (request, reply) => {
    const { id } = listingIdParamSchema.parse(request.params);
    const listing = await listingRepository.findById(id);
    if (!listing) {
      return reply.status(404).send({ error: 'NOT_FOUND', message: 'Listing not found' });
    }

    publishListing(listing);
    const published = await listingRepository.publish(id);

    return {
      ...published,
      createdAt: published.createdAt.toISOString(),
    };
  });
}
