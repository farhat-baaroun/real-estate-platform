import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';

import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';

const meta = {
  title: 'Design System/Overview',
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type ColorToken = {
  name: string;
  hex: string;
  role: string;
  background: string;
  text?: string;
};

const brandTokens: ColorToken[] = [
  { name: 'Near Black', hex: '#0e0f0c', role: 'Primary text', background: 'var(--ds-color-text-primary)', text: 'var(--ds-color-surface)' },
  { name: 'Wise Green', hex: '#9fe870', role: 'Primary CTA', background: 'var(--ds-color-accent-primary)' },
  { name: 'Dark Green', hex: '#163300', role: 'Button text on green', background: 'var(--ds-color-accent-primary-foreground)', text: 'var(--ds-color-surface)' },
  { name: 'Mint', hex: '#e2f6d5', role: 'Soft green surface', background: 'var(--ds-color-accent-soft)' }
];

const semanticTokens: ColorToken[] = [
  { name: 'Positive', hex: '#054d28', role: 'Success', background: 'var(--ds-color-positive)', text: 'var(--ds-color-surface)' },
  { name: 'Danger', hex: '#d03238', role: 'Error', background: 'var(--ds-color-danger)', text: 'var(--ds-color-surface)' },
  { name: 'Warning', hex: '#ffd11a', role: 'Warning', background: 'var(--ds-color-warning)' },
  { name: 'Orange', hex: '#ffc091', role: 'Warm accent', background: 'var(--ds-color-orange)' }
];

const neutralTokens: ColorToken[] = [
  { name: 'Warm Dark', hex: '#454745', role: 'Secondary text', background: 'var(--ds-color-text-secondary)', text: 'var(--ds-color-surface)' },
  { name: 'Gray', hex: '#868685', role: 'Muted text', background: 'var(--ds-color-text-muted)', text: 'var(--ds-color-surface)' },
  { name: 'Light', hex: '#e8ebe6', role: 'Light surface', background: 'var(--ds-color-surface-soft)' }
];

function Section({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-[var(--ds-space-4)]">
      <div className="flex items-center gap-[var(--ds-space-2)]">
        <span className="text-[var(--ds-font-size-caption)] font-semibold text-[var(--ds-color-text-muted)]">{index}</span>
        <h2 className="text-[var(--ds-font-size-feature)] font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function ColorRow({ title, tokens }: { title: string; tokens: ColorToken[] }) {
  return (
    <Card className="rounded-[var(--ds-radius-card-sm)]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-[var(--ds-space-3)] md:grid-cols-2">
        {tokens.map((token) => (
          <div key={token.name} className="flex items-center gap-[var(--ds-space-3)] rounded-[var(--ds-radius-input)] border border-[var(--ds-color-border-default)] p-[var(--ds-space-3)]">
            <div
              className="size-[var(--ds-control-h-md)] rounded-[var(--ds-radius-input)] border border-[var(--ds-color-border-default)]"
              style={{ background: token.background }}
            />
            <div>
              <p className="font-semibold">{token.name}</p>
              <p className="text-[var(--ds-font-size-caption)] text-[var(--ds-color-text-muted)]">{token.hex}</p>
              <p className="text-[var(--ds-font-size-caption)]">{token.role}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export const WiseInspiredFoundation: Story = {
  render: () => (
    <div className="min-h-screen bg-[var(--ds-color-surface)] px-[var(--ds-space-6)] py-[var(--ds-space-6)] text-[var(--ds-color-text-primary)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-[var(--ds-space-6)]">
        <header className="space-y-[var(--ds-space-3)]">
          <p className="text-[var(--ds-font-size-caption)] text-[var(--ds-color-text-muted)]">Design System</p>
          <div>
            <h1 className="text-[var(--ds-font-size-display-hero)] font-black leading-[var(--ds-line-height-display)] tracking-normal">
              Inspired by Wise
            </h1>
            <p className="text-[var(--ds-font-size-caption)] text-[var(--ds-color-text-muted)]">
              A design token catalog generated from DESIGN.md. Every color, font, and component - bold, green, and borderless.
            </p>
          </div>
          <div className="flex gap-[var(--ds-space-3)]">
            <Button>Send Money</Button>
            <Button variant="secondary">Learn More</Button>
          </div>
        </header>

        <Section index="01 / Colors" title="Color Palette">
          <ColorRow title="Brand" tokens={brandTokens} />
          <ColorRow title="Semantic" tokens={semanticTokens} />
          <ColorRow title="Neutral" tokens={neutralTokens} />
        </Section>

        <Section index="02 / Typography" title="Typography Scale">
          <Card className="rounded-[var(--ds-radius-card-sm)]">
            <CardContent className="space-y-[var(--ds-space-3)] pt-[var(--ds-space-6)]">
              <p className="text-[var(--ds-font-size-display-hero)] font-black leading-[var(--ds-line-height-display)]">
                DISPLAY HERO
              </p>
              <p className="text-[var(--ds-font-size-caption)] text-[var(--ds-color-text-muted)]">
                Display - 126px / 900 / 0.85 / Wise Sans / &quot;calt&quot;
              </p>
              <p className="text-[2.5rem] font-black leading-[var(--ds-line-height-display)]">Section Title</p>
              <p className="text-[var(--ds-font-size-feature)] font-semibold leading-[var(--ds-line-height-tight)]">Card Title</p>
              <p className="text-[var(--ds-font-size-body)]">
                Body - Send money abroad. Fast, cheap, transparent. No hidden fees, no bad exchange rates.
              </p>
              <p className="text-[var(--ds-font-size-body)] font-semibold">Body Semibold - Account balance</p>
              <p className="text-[var(--ds-font-size-caption)] font-semibold">Caption - Updated 2 minutes ago</p>
            </CardContent>
          </Card>
        </Section>

        <Section index="03 / Buttons" title="Buttons">
          <Card className="rounded-[var(--ds-radius-card-sm)]">
            <CardContent className="flex flex-wrap items-center gap-[var(--ds-space-3)] pt-[var(--ds-space-6)]">
              <Button>Send Money</Button>
              <Button variant="secondary">Learn More</Button>
              <p className="w-full text-[var(--ds-font-size-caption)] text-[var(--ds-color-text-muted)]">
                Hover to see scale(1.05) grow. Click for scale(0.95) compress.
              </p>
            </CardContent>
          </Card>
        </Section>

        <Section index="04 / Cards" title="Cards">
          <div className="grid gap-[var(--ds-space-4)] md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>International Transfers</CardTitle>
                <CardDescription>
                  Send money to 80+ countries at the real exchange rate.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-[var(--ds-color-accent-primary)]">
              <CardHeader>
                <CardTitle>Multi-currency Account</CardTitle>
                <CardDescription>Hold and convert 40+ currencies with green accent style.</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Business Account</CardTitle>
                <CardDescription>Manage international invoices and payments in one place.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </Section>

        <Section index="05 / Forms" title="Forms">
          <Card className="rounded-[var(--ds-radius-card-sm)]">
            <CardContent className="grid gap-[var(--ds-space-4)] pt-[var(--ds-space-6)] md:grid-cols-2">
              <Input defaultValue="1,000.00 GBP" aria-label="Amount" />
              <Input defaultValue="John Smith" aria-label="Recipient" />
              <div className="space-y-[var(--ds-space-1)]">
                <Input
                  defaultValue="invalid"
                  aria-label="IBAN"
                  aria-invalid="true"
                  aria-describedby="iban-error"
                  className="border-[var(--ds-color-danger)] text-[var(--ds-color-danger)]"
                />
                <p id="iban-error" className="text-[var(--ds-font-size-caption)] text-[var(--ds-color-danger)]">
                  Invalid IBAN format.
                </p>
              </div>
              <Input placeholder="Payment reference..." aria-label="Reference" />
            </CardContent>
          </Card>
        </Section>

        <Section index="06 / Spacing" title="Spacing">
          <div className="flex flex-wrap gap-[var(--ds-space-3)]">
            {['4', '8', '12', '16', '20', '24'].map((size) => (
              <div key={size} className="rounded-[var(--ds-radius-input)] border border-[var(--ds-color-border-default)] px-[var(--ds-space-3)] py-[var(--ds-space-2)] text-[var(--ds-font-size-caption)]">
                {size}
              </div>
            ))}
          </div>
        </Section>

        <Section index="07 / Radius" title="Radius">
          <div className="flex flex-wrap items-center gap-[var(--ds-space-3)]">
            <div className="h-[var(--ds-control-h-md)] w-[var(--ds-story-width-sm)] rounded-[var(--ds-radius-input)] border border-[var(--ds-color-border-default)] bg-[var(--ds-color-surface-soft)] px-[var(--ds-space-3)] py-[var(--ds-space-2)] text-[var(--ds-font-size-caption)]">10px</div>
            <div className="h-[var(--ds-control-h-md)] w-[var(--ds-story-width-sm)] rounded-[var(--ds-radius-card-sm)] border border-[var(--ds-color-border-default)] bg-[var(--ds-color-surface-soft)] px-[var(--ds-space-3)] py-[var(--ds-space-2)] text-[var(--ds-font-size-caption)]">16px</div>
            <div className="h-[var(--ds-control-h-md)] w-[var(--ds-story-width-sm)] rounded-[var(--ds-radius-card-lg)] border border-[var(--ds-color-border-default)] bg-[var(--ds-color-surface-soft)] px-[var(--ds-space-3)] py-[var(--ds-space-2)] text-[var(--ds-font-size-caption)]">30px</div>
            <div className="h-[var(--ds-control-h-md)] w-[var(--ds-story-width-sm)] rounded-[var(--ds-radius-section)] border border-[var(--ds-color-border-default)] bg-[var(--ds-color-surface-soft)] px-[var(--ds-space-3)] py-[var(--ds-space-2)] text-[var(--ds-font-size-caption)]">40px</div>
            <div className="h-[var(--ds-control-h-md)] w-[var(--ds-story-width-sm)] rounded-[var(--ds-radius-pill)] border border-[var(--ds-color-border-default)] bg-[var(--ds-color-surface-soft)] px-[var(--ds-space-3)] py-[var(--ds-space-2)] text-[var(--ds-font-size-caption)]">pill</div>
          </div>
        </Section>

        <Section index="08 / Elevation" title="Depth">
          <div className="grid gap-[var(--ds-space-3)] md:grid-cols-2">
            <div className="rounded-[var(--ds-radius-card-sm)] border border-[var(--ds-color-border-default)] bg-[var(--ds-color-surface)] p-[var(--ds-space-4)]">
              <p className="font-semibold">Flat</p>
              <p className="text-[var(--ds-font-size-caption)] text-[var(--ds-color-text-muted)]">No shadow</p>
            </div>
            <div className="rounded-[var(--ds-radius-card-sm)] border border-[var(--ds-color-border-default)] bg-[var(--ds-color-surface)] p-[var(--ds-space-4)] shadow-[var(--ds-shadow-ring)]">
              <p className="font-semibold">Ring</p>
              <p className="text-[var(--ds-font-size-caption)] text-[var(--ds-color-text-muted)]">1px ring shadow</p>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
};
