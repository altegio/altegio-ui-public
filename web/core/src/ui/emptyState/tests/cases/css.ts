import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-empty-state-gap', root: '--y-core-size-spacing-4-x' },
  { host: '--y-core-empty-state-medium-padding', root: '--y-core-size-spacing-4-x' },
  { host: '--y-core-empty-state-small-padding', root: '--y-core-size-spacing-3-x' },
  { host: '--y-core-empty-state-content-gap', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-empty-state-background-color', root: '--y-core-color-surface-tertiary' },
  { host: '--y-core-empty-state-actions-gap', root: '--y-core-size-spacing-2-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-empty-state-gap', value: SIZES.spacing_4_x.cssValue },
  { host: '--y-core-empty-state-medium-padding', value: SIZES.spacing_4_x.cssValue },
  { host: '--y-core-empty-state-small-padding', value: SIZES.spacing_3_x.cssValue },
  { host: '--y-core-empty-state-content-gap', value: SIZES.spacing_2_x.cssValue },
  { host: '--y-core-empty-state-background-color', value: COLORS.surface_tertiary.cssValue },
  { host: '--y-core-empty-state-actions-gap', value: SIZES.spacing_2_x.cssValue },
]
