import { InvalidPriceError } from '../errors';

export class Price {
  readonly #value: number;

  constructor(value: number) {
    if (value <= 0) {
      throw new InvalidPriceError('Price must be greater than 0');
    }
    this.#value = value;
  }

  get value(): number {
    return this.#value;
  }
}
