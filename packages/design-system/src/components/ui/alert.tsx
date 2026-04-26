import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const alertVariants = cva(
  'relative w-full rounded-[var(--ds-radius-card-sm)] border px-[var(--ds-space-4)] py-[var(--ds-space-3)] text-[var(--ds-font-size-caption)]',
  {
  variants: {
    variant: {
      default: 'bg-[var(--ds-color-surface)] border-[var(--ds-color-border-default)] text-[var(--ds-color-text-primary)]',
      success:
        'bg-[var(--ds-color-accent-soft)] border-[var(--ds-color-accent-primary)] text-[var(--ds-color-accent-primary-foreground)]',
      destructive: 'bg-[var(--ds-color-surface)] border-[var(--ds-color-danger)] text-[var(--ds-color-danger)]'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}

type AlertTitleProps = React.ComponentPropsWithoutRef<'h5'> & {
  as?: React.ElementType;
};

function AlertTitle({ as: Component = 'h5', className, ...props }: AlertTitleProps) {
  return (
    <Component
      className={cn(
        'mb-[var(--ds-space-1)] font-semibold leading-[var(--ds-line-height-tight)] text-[var(--ds-font-size-caption)]',
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'text-[var(--ds-font-size-caption)] text-[var(--ds-color-text-secondary)] [&_p]:leading-[var(--ds-line-height-tight)]',
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle };
