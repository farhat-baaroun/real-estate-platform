import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-[var(--ds-space-2)] whitespace-nowrap rounded-[var(--ds-radius-pill)] text-[var(--ds-font-size-button-sm)] font-semibold transition-transform duration-150 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-color-accent-primary)] focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--ds-color-accent-primary)] text-[var(--ds-color-accent-primary-foreground)] hover:scale-105 active:scale-95',
        secondary:
          'bg-[var(--ds-color-accent-soft)] text-[var(--ds-color-text-primary)] hover:scale-105 active:scale-95',
        outline:
          'border border-[var(--ds-color-border-default)] bg-transparent text-[var(--ds-color-text-primary)] hover:scale-105 active:scale-95',
        ghost:
          'text-[var(--ds-color-text-primary)] hover:bg-[var(--ds-color-accent-soft)] hover:scale-105 active:scale-95'
      },
      size: {
        default:
          'h-[var(--ds-control-h-md)] px-[var(--ds-space-4)] py-[var(--ds-space-2)] text-[var(--ds-font-size-button-md)]',
        sm: 'h-[var(--ds-control-h-sm)] px-[var(--ds-space-3)] text-[var(--ds-font-size-button-sm)]',
        lg: 'h-[var(--ds-control-h-lg)] px-[var(--ds-space-6)] text-[var(--ds-font-size-button-lg)]'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ className, variant, size, asChild = false, children, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  const content = asChild ? React.Children.only(children) : children;

  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {content}
    </Comp>
  );
}

export { buttonVariants };
