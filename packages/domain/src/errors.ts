export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, DomainError.prototype);
    this.name = 'DomainError';
  }
}

export class InvalidPriceError extends DomainError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidPriceError.prototype);
    this.name = 'InvalidPriceError';
  }
}

export class InvalidStateError extends DomainError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidStateError.prototype);
    this.name = 'InvalidStateError';
  }
}
