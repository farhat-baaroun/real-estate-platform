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
    borderDefault: 'var(--ds-color-border-default)'
  },
  radius: {
    input: 'var(--ds-radius-input)',
    cardSm: 'var(--ds-radius-card-sm)',
    cardLg: 'var(--ds-radius-card-lg)',
    pill: 'var(--ds-radius-pill)'
  },
  size: {
    controlSm: 'var(--ds-control-h-sm)',
    controlMd: 'var(--ds-control-h-md)',
    controlLg: 'var(--ds-control-h-lg)'
  }
} as const;

export type DesignTheme = typeof designTheme;
