import { COLORS, SIZES } from '~tokens/index'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-simple-toggle-radius', root: '--y-core-size-radius-4-x' },
  { host: '--y-core-simple-toggle-size-small-padding', root: '--y-core-size-spacing-0-5-x' },
  { host: '--y-core-simple-toggle-size-medium-padding', root: '--y-core-size-spacing-x' },
  { host: '--y-core-simple-toggle-unchecked-bg-default', root: '--y-core-color-surface-tertiary' },
  { host: '--y-core-simple-toggle-unchecked-bg-hover', root: '--y-core-color-surface-tertiary-high' },
  { host: '--y-core-simple-toggle-unchecked-bg-disabled', root: '--y-core-color-surface-tertiary-low' },
  { host: '--y-core-simple-toggle-checked-bg-default', root: '--y-core-color-surface-accent' },
  { host: '--y-core-simple-toggle-checked-bg-hover', root: '--y-core-color-surface-accent-high' },
  { host: '--y-core-simple-toggle-checked-bg-disabled', root: '--y-core-color-surface-accent-low' },
  { host: '--y-core-simple-toggle-thumb-bg', root: '--y-core-color-surface-primary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-simple-toggle-radius', value: SIZES.radius_4_x.cssValue },
  { host: '--y-core-simple-toggle-size-small-padding', value: SIZES.spacing_0_5_x.cssValue },
  { host: '--y-core-simple-toggle-size-medium-padding', value: SIZES.spacing_x.cssValue },
  { host: '--y-core-simple-toggle-unchecked-bg-default', value: COLORS.surface_tertiary.cssValue },
  { host: '--y-core-simple-toggle-unchecked-bg-hover', value: COLORS.surface_tertiary_high.cssValue },
  { host: '--y-core-simple-toggle-unchecked-bg-disabled', value: COLORS.surface_tertiary_low.cssValue },
  { host: '--y-core-simple-toggle-checked-bg-default', value: COLORS.surface_accent.cssValue },
  { host: '--y-core-simple-toggle-checked-bg-hover', value: COLORS.surface_accent_high.cssValue },
  { host: '--y-core-simple-toggle-checked-bg-disabled', value: COLORS.surface_accent_low.cssValue },
  { host: '--y-core-simple-toggle-thumb-bg', value: COLORS.surface_primary.cssValue },
]
