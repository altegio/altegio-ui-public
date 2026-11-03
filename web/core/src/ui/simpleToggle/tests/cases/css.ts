import { COLORS, SIZES } from '~tokens/index'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-simple-toggle-radius', root: '--alt-core-size-radius-4-x' },
  { host: '--alt-core-simple-toggle-size-small-padding', root: '--alt-core-size-spacing-0-5-x' },
  { host: '--alt-core-simple-toggle-size-medium-padding', root: '--alt-core-size-spacing-x' },
  { host: '--alt-core-simple-toggle-unchecked-bg-default', root: '--alt-core-color-surface-tertiary' },
  { host: '--alt-core-simple-toggle-unchecked-bg-hover', root: '--alt-core-color-surface-tertiary-high' },
  { host: '--alt-core-simple-toggle-unchecked-bg-disabled', root: '--alt-core-color-surface-tertiary-low' },
  { host: '--alt-core-simple-toggle-checked-bg-default', root: '--alt-core-color-surface-accent' },
  { host: '--alt-core-simple-toggle-checked-bg-hover', root: '--alt-core-color-surface-accent-high' },
  { host: '--alt-core-simple-toggle-checked-bg-disabled', root: '--alt-core-color-surface-accent-low' },
  { host: '--alt-core-simple-toggle-thumb-bg', root: '--alt-core-color-surface-primary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-simple-toggle-radius', value: SIZES.radius_4_x.cssValue },
  { host: '--alt-core-simple-toggle-size-small-padding', value: SIZES.spacing_0_5_x.cssValue },
  { host: '--alt-core-simple-toggle-size-medium-padding', value: SIZES.spacing_x.cssValue },
  { host: '--alt-core-simple-toggle-unchecked-bg-default', value: COLORS.surface_tertiary.cssValue },
  { host: '--alt-core-simple-toggle-unchecked-bg-hover', value: COLORS.surface_tertiary_high.cssValue },
  { host: '--alt-core-simple-toggle-unchecked-bg-disabled', value: COLORS.surface_tertiary_low.cssValue },
  { host: '--alt-core-simple-toggle-checked-bg-default', value: COLORS.surface_accent.cssValue },
  { host: '--alt-core-simple-toggle-checked-bg-hover', value: COLORS.surface_accent_high.cssValue },
  { host: '--alt-core-simple-toggle-checked-bg-disabled', value: COLORS.surface_accent_low.cssValue },
  { host: '--alt-core-simple-toggle-thumb-bg', value: COLORS.surface_primary.cssValue },
]
