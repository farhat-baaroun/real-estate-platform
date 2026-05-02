import type { Temporal as TemporalType } from 'temporal-polyfill';

declare global {
  namespace Temporal {
    type Instant = TemporalType.Instant;
  }
}

export {};
