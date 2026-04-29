import { ListingStatus, Price, PropertyListing } from '@real-estate/domain';
import { Temporal } from 'temporal-polyfill';

type ListingRecord = {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  status: string;
  createdAt: Date;
};

const toDomainStatus = (status: string): ListingStatus => {
  if (status === 'draft') return ListingStatus.DRAFT;
  if (status === 'published') return ListingStatus.PUBLISHED;
  if (status === 'archived') return ListingStatus.ARCHIVED;
  throw new Error(`Invalid listing status "${status}". Expected one of: DRAFT, PUBLISHED, ARCHIVED.`);
};

export function publishListing(record: ListingRecord): { status: 'published' } {
  const aggregate = new PropertyListing({
    id: record.id,
    title: record.title,
    price: new Price(record.price),
    bedrooms: record.bedrooms,
    createdAt: Temporal.Instant.from(record.createdAt.toISOString()),
    status: toDomainStatus(record.status),
  });

  aggregate.publish();

  return { status: 'published' };
}
