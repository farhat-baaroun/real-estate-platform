export const designTheme = {
  color: {
    textPrimary: 'var(--ds-color-text-primary)',
    textSecondary: 'var(--ds-color-text-secondary)',
    textMuted: 'var(--ds-color-text-muted)',
    surface: 'var(--ds-color-surface)',
    surfaceSoft: 'var(--ds-color-surface-soft)',
    accentPrimary: 'var(--ds-color-accent-primary)',
    accentPrimaryForeground: 'var(--ds-color-accent-primary-foreground)',
    accentSoft: 'var(--ds-color-accent-soft)',
    accentHover: 'var(--ds-color-accent-hover)',
    danger: 'var(--ds-color-danger)',
    warning: 'var(--ds-color-warning)',
    positive: 'var(--ds-color-positive)',
    orange: 'var(--ds-color-orange)',
    borderDefault: 'var(--ds-color-border-default)'
  },
  shadow: {
    ring: 'var(--ds-shadow-ring)',
    insetFocus: 'var(--ds-shadow-inset-focus)'
  },
  radius: {
    input: 'var(--ds-radius-input)',
    cardSm: 'var(--ds-radius-card-sm)',
    cardLg: 'var(--ds-radius-card-lg)',
    section: 'var(--ds-radius-section)',
    pill: 'var(--ds-radius-pill)'
  },
  fontSize: {
    caption: 'var(--ds-font-size-caption)',
    body: 'var(--ds-font-size-body)',
    feature: 'var(--ds-font-size-feature)',
    displayHero: 'var(--ds-font-size-display-hero)',
    buttonSm: 'var(--ds-font-size-button-sm)',
    buttonMd: 'var(--ds-font-size-button-md)',
    buttonLg: 'var(--ds-font-size-button-lg)'
  },
  lineHeight: {
    display: 'var(--ds-line-height-display)',
    tight: 'var(--ds-line-height-tight)'
  },
  space: {
    1: 'var(--ds-space-1)',
    2: 'var(--ds-space-2)',
    3: 'var(--ds-space-3)',
    4: 'var(--ds-space-4)',
    6: 'var(--ds-space-6)'
  },
  size: {
    controlSm: 'var(--ds-control-h-sm)',
    controlMd: 'var(--ds-control-h-md)',
    controlLg: 'var(--ds-control-h-lg)',
    storyWidthSm: 'var(--ds-story-width-sm)',
    storyWidthMd: 'var(--ds-story-width-md)',
    storyWidthLg: 'var(--ds-story-width-lg)'
  }
} as const;

export type DesignTheme = typeof designTheme;
