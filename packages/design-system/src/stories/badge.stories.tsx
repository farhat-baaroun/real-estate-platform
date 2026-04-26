import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from '../components/ui/badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Verified', variant: 'default' }
};

export const Secondary: Story = {
  args: { children: 'Pending', variant: 'secondary' }
};

export const Warning: Story = {
  args: { children: 'Warning', variant: 'warning' }
};

export const Destructive: Story = {
  args: { children: 'Failed', variant: 'destructive' }
};
