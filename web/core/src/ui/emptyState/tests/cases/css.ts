import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-empty-state-gap', root: '--alt-core-size-spacing-4-x' },
  { host: '--alt-core-empty-state-medium-padding', root: '--alt-core-size-spacing-4-x' },
  { host: '--alt-core-empty-state-small-padding', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-empty-state-content-gap', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-empty-state-background-color', root: '--alt-core-color-surface-tertiary' },
  { host: '--alt-core-empty-state-actions-gap', root: '--alt-core-size-spacing-2-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-empty-state-gap', value: SIZES.spacing_4_x.cssValue },
  { host: '--alt-core-empty-state-medium-padding', value: SIZES.spacing_4_x.cssValue },
  { host: '--alt-core-empty-state-small-padding', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-empty-state-content-gap', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-empty-state-background-color', value: COLORS.surface_tertiary.cssValue },
  { host: '--alt-core-empty-state-actions-gap', value: SIZES.spacing_2_x.cssValue },
]
