import * as React from 'react';

import { cn } from '../../lib/utils';

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'rounded-[var(--ds-radius-card-lg)] border border-[var(--ds-color-border-default)] bg-[var(--ds-color-surface)] text-[var(--ds-color-text-primary)] shadow-[var(--ds-shadow-ring)]',
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col gap-[var(--ds-space-2)] p-[var(--ds-space-6)]', className)}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        'text-[var(--ds-font-size-feature)] font-semibold leading-[var(--ds-line-height-tight)] tracking-normal',
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-[var(--ds-font-size-caption)] text-[var(--ds-color-text-muted)]', className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('p-[var(--ds-space-6)] pt-0 text-[var(--ds-font-size-body)]', className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-footer" className={cn('flex items-center p-[var(--ds-space-6)] pt-0', className)} {...props} />
  );
}
