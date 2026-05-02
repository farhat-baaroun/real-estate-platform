import type { ListingFilter, ListingRepository, ListingSort } from '../infrastructure/repositories/listing.repository';

export async function getListings(
  listingRepository: ListingRepository,
  args: { filter: ListingFilter; page: number; limit: number; sort: ListingSort }
) {
  return listingRepository.findAll(args.filter, args.page, args.limit, args.sort);
}
