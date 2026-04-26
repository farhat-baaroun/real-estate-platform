import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered'
  }
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PropertyCard: Story = {
  render: () => (
    <Card className="w-full max-w-[var(--ds-story-width-md)]">
      <CardHeader>
        <CardTitle>Apartment - Downtown</CardTitle>
        <CardDescription>2 bed, 2 bath, 114 sqm</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-zinc-600">Listed at $295,000. Available for immediate viewing.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Contact Agent</Button>
      </CardFooter>
    </Card>
  )
};

export const SuccessCard: Story = {
  render: () => (
    <Card className="w-full max-w-[var(--ds-story-width-md)] border-[var(--ds-color-accent-primary)]">
      <CardHeader>
        <CardTitle>Payment Received</CardTitle>
        <CardDescription>Transfer completed successfully.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-[var(--ds-font-size-caption)] text-[var(--ds-color-text-secondary)]">
          $1,200 arrived in your account.
        </p>
      </CardContent>
    </Card>
  )
};

export const WarningCard: Story = {
  render: () => (
    <Card className="w-full max-w-[var(--ds-story-width-md)]">
      <CardHeader>
        <CardTitle>Action Required</CardTitle>
        <CardDescription>Verify recipient details before sending.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="secondary" size="sm">
          Review Details
        </Button>
      </CardFooter>
    </Card>
  )
};

export const CompactCard: Story = {
  render: () => (
    <Card className="w-full max-w-[var(--ds-story-width-sm)] rounded-[var(--ds-radius-card-sm)]">
      <CardContent className="p-[var(--ds-space-4)]">
        <p className="text-[var(--ds-font-size-caption)]">Compact card for dense dashboard layouts.</p>
      </CardContent>
    </Card>
  )
};
