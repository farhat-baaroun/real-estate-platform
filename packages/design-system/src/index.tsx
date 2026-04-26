import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean;
};

export function Button({ asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp {...props}>Slot</Comp>;
}
