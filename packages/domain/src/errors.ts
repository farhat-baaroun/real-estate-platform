export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}

export class InvalidPriceError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPriceError';
  }
}

export class InvalidStateError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidStateError';
  }
}
