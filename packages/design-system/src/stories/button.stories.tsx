import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../components/ui/button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Book Viewing'
  },
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Action'
  }
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Action'
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Action'
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large CTA'
  }
};
