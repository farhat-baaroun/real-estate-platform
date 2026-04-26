import * as React from 'react';

import { cn } from '../../lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-[var(--ds-color-text-secondary)] placeholder:text-[var(--ds-color-text-muted)] selection:bg-[var(--ds-color-accent-primary)] selection:text-[var(--ds-color-accent-primary-foreground)] border-[var(--ds-color-border-default)] flex h-[var(--ds-control-h-md)] w-full min-w-0 rounded-[var(--ds-radius-input)] border bg-[var(--ds-color-surface)] px-[var(--ds-space-3)] py-[var(--ds-space-1)] text-[var(--ds-font-size-body)] shadow-[var(--ds-shadow-ring)] transition-[color,box-shadow] outline-none file:inline-flex file:h-[var(--ds-control-h-sm)] file:border-0 file:bg-transparent file:text-[var(--ds-font-size-caption)] file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-[var(--ds-font-size-caption)] focus-visible:ring-2 focus-visible:ring-[var(--ds-color-accent-primary)]',
        className
      )}
      {...props}
    />
  );
}

export { Input };
