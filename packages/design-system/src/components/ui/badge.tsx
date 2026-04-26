import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-[var(--ds-radius-pill)] border px-[var(--ds-space-3)] py-[var(--ds-space-1)] text-[var(--ds-font-size-caption)] font-semibold transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[var(--ds-color-accent-soft)] text-[var(--ds-color-accent-primary-foreground)]',
        secondary: 'border-transparent bg-[var(--ds-color-surface-soft)] text-[var(--ds-color-text-primary)]',
        warning: 'border-transparent bg-[var(--ds-color-warning)] text-[var(--ds-color-text-primary)]',
        destructive: 'border-transparent bg-[var(--ds-color-danger)] text-[var(--ds-color-surface)]'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface BadgeProps extends React.ComponentProps<'div'>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
