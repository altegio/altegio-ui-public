import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-status-color', root: '--alt-core-color-text-primary' },
  { host: '--alt-core-status-large-padding', root: '--alt-core-size-spacing-7-x' },
  { host: '--alt-core-status-large-border-radius', root: '--alt-core-size-radius-5-x' },
  { host: '--alt-core-status-medium-border-radius', root: '--alt-core-size-radius-4-x' },
  { host: '--alt-core-status-waiting-background-color', root: '--alt-core-color-surface-secondary' },
  { host: '--alt-core-status-success-background-color', root: '--alt-core-color-surface-positive-low' },
  { host: '--alt-core-status-error-background-color', root: '--alt-core-color-surface-negative-low' },
  { host: '--alt-core-status-error-icon-color', root: '--alt-core-color-icon-negative' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-status-color', value: COLORS.text_primary.cssValue },
  { host: '--alt-core-status-large-padding', value: SIZES.spacing_7_x.cssValue },
  { host: '--alt-core-status-success-background-color', value: COLORS.surface_positive_low.cssValue },
  { host: '--alt-core-status-error-background-color', value: COLORS.surface_negative_low.cssValue },
]
