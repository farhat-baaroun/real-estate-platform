import { InvalidStateError } from '../errors';
import { ListingStatus } from '../value-objects/listing-status';
import { Price } from '../value-objects/price';

type PropertyListingProps = {
  id: string;
  title: string;
  price: Price;
  bedrooms: number;
  createdAt: Temporal.Instant;
  status?: ListingStatus;
};

type PropertyListingDetails = {
  title?: string;
  bedrooms?: number;
};

export class PropertyListing {
  readonly id: string;
  readonly title: string;
  readonly price: Price;
  readonly bedrooms: number;
  readonly createdAt: Temporal.Instant;
  readonly status: ListingStatus;

  constructor({ id, title, price, bedrooms, createdAt, status = ListingStatus.DRAFT }: PropertyListingProps) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.bedrooms = bedrooms;
    this.createdAt = createdAt;
    this.status = status;
  }

  publish(): PropertyListing {
    if (this.status === ListingStatus.PUBLISHED) {
      throw new InvalidStateError('Listing already published');
    }

    if (!this.status.canTransitionTo(ListingStatus.PUBLISHED)) {
      throw new InvalidStateError('Only drafted listings can be published');
    }

    // Defensive invariant check at aggregate boundary.
    if (this.price.value <= 0) {
      throw new InvalidStateError('Price is required');
    }

    return this.clone({ status: ListingStatus.PUBLISHED });
  }

  updateDetails(details: PropertyListingDetails): PropertyListing {
    if (this.status !== ListingStatus.DRAFT) {
      throw new InvalidStateError('Cannot update a published listing');
    }

    return this.clone({
      title: details.title ?? this.title,
      bedrooms: details.bedrooms ?? this.bedrooms,
    });
  }

  changePrice(newPrice: Price): PropertyListing {
    if (this.status !== ListingStatus.DRAFT) {
      throw new InvalidStateError('Cannot update a published listing');
    }

    return this.clone({ price: newPrice });
  }

  private clone(overrides: Partial<PropertyListingProps>): PropertyListing {
    return new PropertyListing({
      id: overrides.id ?? this.id,
      title: overrides.title ?? this.title,
      price: overrides.price ?? this.price,
      bedrooms: overrides.bedrooms ?? this.bedrooms,
      createdAt: overrides.createdAt ?? this.createdAt,
      status: overrides.status ?? this.status,
    });
  }
}



