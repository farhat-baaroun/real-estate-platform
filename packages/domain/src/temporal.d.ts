import type { Temporal as TemporalType } from '@js-temporal/polyfill';

declare global {
  namespace Temporal {
    type Instant = TemporalType.Instant;
  }
}

export {};
