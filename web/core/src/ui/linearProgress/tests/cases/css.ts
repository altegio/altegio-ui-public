import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-linear-progress-track-background-color', root: '--alt-core-color-surface-tertiary' },
  { host: '--alt-core-linear-progress-border-radius', root: '--alt-core-size-radius-x' },
  { host: '--alt-core-linear-progress-small-height', root: '--alt-core-size-spacing-x' },
  { host: '--alt-core-linear-progress-medium-height', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-linear-progress-accent-background-color', root: '--alt-core-color-surface-accent' },
  { host: '--alt-core-linear-progress-positive-background-color', root: '--alt-core-color-surface-positive' },
  { host: '--alt-core-linear-progress-negative-background-color', root: '--alt-core-color-surface-negative' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-linear-progress-track-background-color', value: COLORS.surface_tertiary.cssValue },
  { host: '--alt-core-linear-progress-accent-background-color', value: COLORS.surface_accent.cssValue },
  { host: '--alt-core-linear-progress-small-height', value: SIZES.spacing_x.cssValue },
  { host: '--alt-core-linear-progress-medium-height', value: SIZES.spacing_2_x.cssValue },
]
