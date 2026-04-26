import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '../components/ui/input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter recipient email',
    className: 'w-full max-w-[var(--ds-story-width-sm)]'
  }
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    className: 'w-full max-w-[var(--ds-story-width-sm)]'
  }
};

export const WithValue: Story = {
  args: {
    defaultValue: 'hello@wise-inspired.com',
    className: 'w-full max-w-[var(--ds-story-width-sm)]'
  }
};
