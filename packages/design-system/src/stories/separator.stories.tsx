import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from '../components/ui/separator';

const meta = {
  title: 'Components/Separator',
  component: Separator,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-full max-w-[var(--ds-story-width-lg)] space-y-[var(--ds-space-4)]">
      <p className="text-[var(--ds-font-size-caption)]">Account Settings</p>
      <Separator />
      <p className="text-[var(--ds-font-size-caption)] text-[var(--ds-color-text-muted)]">Security & Privacy</p>
    </div>
  )
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-[var(--ds-control-h-sm)] items-center space-x-[var(--ds-space-4)] text-[var(--ds-font-size-caption)]">
      <div>Overview</div>
      <Separator orientation="vertical" />
      <div>Transactions</div>
      <Separator orientation="vertical" />
      <div>Recipients</div>
    </div>
  )
};
