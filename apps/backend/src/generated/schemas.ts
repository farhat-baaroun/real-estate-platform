import { z } from 'zod';

const SignUpInputSchema = z.object({ "email": z.string().email(), "password": z.string().min(8) })

const SignInInputSchema = z.object({ "email": z.string().email(), "password": z.string() })

const AuthSessionSchema = z.object({ "userId": z.string().optional() })

const PaginationMetaSchema = z.object({ "totalCount": z.number().int().optional(), "pageCount": z.number().int().optional(), "currentPage": z.number().int().optional(), "perPage": z.number().int().optional() })

const ListingFilterSchema = z.object({ "minPrice": z.number().optional(), "maxPrice": z.number().optional(), "bedrooms": z.number().int().optional(), "status": z.enum(["draft","published","archived"]).optional() })

const CreateListingInputSchema = z.object({ "title": z.string().min(1), "price": z.number().gt(0), "bedrooms": z.number().int().gte(0) })

const UpdateListingInputSchema = z.object({ "title": z.string().min(1).optional(), "bedrooms": z.number().int().gte(0).optional() })

const ListingSchema = z.object({ "id": z.string().optional(), "title": z.string().optional(), "price": z.number().optional(), "bedrooms": z.number().int().optional(), "status": z.enum(["draft","published","archived"]).optional(), "createdAt": z.string().datetime({ offset: true }).optional() })

const ListingPageSchema = z.object({ "data": z.array(z.any()).optional(), "meta": z.any().optional() })

const ErrorSchema = z.object({ "error": z.string().optional(), "message": z.string().optional() })
