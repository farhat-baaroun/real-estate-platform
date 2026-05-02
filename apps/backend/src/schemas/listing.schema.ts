import { z } from 'zod';

export const sortSchema = z.enum(['createdAt_asc', 'createdAt_desc', 'price_asc', 'price_desc']).default('createdAt_desc');

export const filterSchema = z
  .object({
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
    bedrooms: z.coerce.number().int().optional(),
    status: z.enum(['draft', 'published', 'archived']).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.minPrice !== undefined && value.maxPrice !== undefined && value.minPrice > value.maxPrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'minPrice must be less than or equal to maxPrice',
        path: ['minPrice'],
      });
    }
  })
  .default({});

export const getListingsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: sortSchema,
  filter: filterSchema,
});

export const listingIdParamSchema = z.object({
  id: z.string().regex(/^c[a-z0-9]{24}$/, 'id must be a valid cuid'),
});

export const createListingSchema = z.object({
  title: z.string().min(1),
  price: z.number().gt(0),
  bedrooms: z.number().int().min(0),
});

export const updateListingSchema = z
  .object({
    title: z.string().min(1).optional(),
    bedrooms: z.number().int().min(0).optional(),
  })
  .refine((value) => value.title !== undefined || value.bedrooms !== undefined, {
    message: 'At least one field is required',
  });
