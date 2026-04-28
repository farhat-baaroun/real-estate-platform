import { describe, expect, it } from 'vitest';
import { Temporal } from '@js-temporal/polyfill';

import { InvalidPriceError, InvalidStateError, ListingStatus, Price, PropertyListing } from '../index';

function makeDraftListing(price: Price = new Price(100_000)): PropertyListing {
  return new PropertyListing({
    id: 'listing-1',
    title: 'Downtown Apartment',
    price,
    bedrooms: 2,
    createdAt: Temporal.Instant.from('2026-01-01T00:00:00Z'),
  });
}

describe('PropertyListing', () => {
  it('publishes a listing with a price greater than 0', () => {
    const listing = makeDraftListing(new Price(250_000));

    const publishedListing = listing.publish();

    expect(publishedListing.status).toBe(ListingStatus.PUBLISHED);
  });

  it('rejects publishing a listing without a price', () => {
    const listing = makeDraftListing({ value: 0 } as Price);

    expect(() => listing.publish()).toThrowError(new InvalidStateError('Price is required'));
  });

  it('rejects publishing an already published listing', () => {
    const listing = makeDraftListing().publish();

    expect(() => listing.publish()).toThrowError(new InvalidStateError('Listing already published'));
  });

  it('updates listing details while draft', () => {
    const listing = makeDraftListing();

    const updatedListing = listing.updateDetails({ bedrooms: 4 });

    expect(updatedListing.bedrooms).toBe(4);
    expect(updatedListing.title).toBe(listing.title);
  });

  it('rejects setting listing price to zero', () => {
    expect(() => new Price(0)).toThrowError(new InvalidPriceError('Price must be greater than 0'));
  });

  it('rejects updating details after publish', () => {
    const listing = makeDraftListing().publish();

    expect(() => listing.updateDetails({ bedrooms: 3 })).toThrowError(
      new InvalidStateError('Cannot update a published listing')
    );
  });

  it('rejects changing price after publish', () => {
    const listing = makeDraftListing().publish();

    expect(() => listing.changePrice(new Price(120_000))).toThrowError(
      new InvalidStateError('Cannot update a published listing')
    );
  });

  it('returns a new instance when changing price', () => {
    const listing = makeDraftListing(new Price(100_000));

    const updatedListing = listing.changePrice(new Price(150_000));

    expect(updatedListing).not.toBe(listing);
    expect(updatedListing.price.value).toBe(150_000);
    expect(listing.price.value).toBe(100_000);
  });
});
