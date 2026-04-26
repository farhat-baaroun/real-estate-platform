import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert className="w-full max-w-[var(--ds-story-width-lg)]">
      <AlertTitle>Transfer queued</AlertTitle>
      <AlertDescription>Your transfer will be processed in the next 15 minutes.</AlertDescription>
    </Alert>
  )
};

export const Success: Story = {
  render: () => (
    <Alert variant="success" className="w-full max-w-[var(--ds-story-width-lg)]">
      <AlertTitle>Transfer complete</AlertTitle>
      <AlertDescription>The funds were delivered successfully.</AlertDescription>
    </Alert>
  )
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-full max-w-[var(--ds-story-width-lg)]">
      <AlertTitle>Transfer failed</AlertTitle>
      <AlertDescription>We could not validate the destination account details.</AlertDescription>
    </Alert>
  )
};
