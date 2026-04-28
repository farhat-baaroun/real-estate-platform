export class ListingStatus {
  static readonly DRAFT = new ListingStatus('DRAFT');
  static readonly PUBLISHED = new ListingStatus('PUBLISHED');
  static readonly ARCHIVED = new ListingStatus('ARCHIVED');

  readonly #value: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

  private constructor(value: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED') {
    this.#value = value;
  }

  get value(): 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' {
    return this.#value;
  }

  canTransitionTo(nextStatus: ListingStatus): boolean {
    if (this === ListingStatus.DRAFT) {
      return nextStatus === ListingStatus.PUBLISHED || nextStatus === ListingStatus.ARCHIVED;
    }
    if (this === ListingStatus.PUBLISHED) {
      return nextStatus === ListingStatus.ARCHIVED;
    }
    return false;
  }
}
