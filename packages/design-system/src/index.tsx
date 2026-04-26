import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean;
};

export function Button({ asChild, children, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  const content = asChild ? React.Children.only(children) : children;
  return <Comp {...props}>{content}</Comp>;
}
