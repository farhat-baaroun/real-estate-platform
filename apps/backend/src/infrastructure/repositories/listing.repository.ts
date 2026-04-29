import type { PrismaClient } from '@prisma/client';

export type ListingSort = 'createdAt_asc' | 'createdAt_desc' | 'price_asc' | 'price_desc';

export type ListingFilter = {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  status?: 'draft' | 'published' | 'archived';
};

export type CreateListingData = {
  title: string;
  price: number;
  bedrooms: number;
};

export type UpdateListingData = {
  title?: string;
  bedrooms?: number;
};

export class ListingRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(filter: ListingFilter, page: number, limit: number, sort: ListingSort) {
    const where = {
      ...(filter.minPrice !== undefined ? { price: { gte: filter.minPrice } } : {}),
      ...(filter.maxPrice !== undefined
        ? { price: { ...(filter.minPrice !== undefined ? { gte: filter.minPrice } : {}), lte: filter.maxPrice } }
        : {}),
      ...(filter.bedrooms !== undefined ? { bedrooms: filter.bedrooms } : {}),
      ...(filter.status !== undefined ? { status: filter.status } : {}),
    };

    const [sortField, sortDirection] = sort.split('_') as ['createdAt' | 'price', 'asc' | 'desc'];

    const [rows, totalCount] = await this.prisma.$transaction([
      this.prisma.listing.findMany({
        where,
        orderBy: { [sortField]: sortDirection },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.listing.count({ where }),
    ]);

    return {
      data: rows,
      meta: {
        totalCount,
        pageCount: Math.ceil(totalCount / limit),
        currentPage: page,
        perPage: limit,
      },
    };
  }

  async findById(id: string) {
    return this.prisma.listing.findUnique({ where: { id } });
  }

  async create(data: CreateListingData) {
    return this.prisma.listing.create({
      data: {
        ...data,
        status: 'draft',
      },
    });
  }

  async updateDraft(id: string, data: UpdateListingData) {
    const result = await this.prisma.listing.updateMany({
      where: { id, status: 'draft' },
      data,
    });

    if (result.count === 0) {
      return null;
    }

    return this.prisma.listing.findUnique({ where: { id } });
  }

  async publish(id: string) {
    return this.prisma.listing.update({
      where: { id },
      data: { status: 'published' },
    });
  }
}
