import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-stepper-gap', root: '--alt-core-size-spacing-6-x' },
  { host: '--alt-core-stepper-color', root: '--alt-core-color-text-primary' },
  { host: '--alt-core-stepper-indicator-size', root: '--alt-core-size-spacing-6-x' },
  { host: '--alt-core-stepper-active-indicator-background-color', root: '--alt-core-color-surface-accent' },
  { host: '--alt-core-stepper-done-indicator-color', root: '--alt-core-color-icon-positive' },
  { host: '--alt-core-stepper-error-indicator-color', root: '--alt-core-color-icon-negative' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-stepper-gap', value: SIZES.spacing_6_x.cssValue },
  { host: '--alt-core-stepper-active-indicator-background-color', value: COLORS.surface_accent.cssValue },
  { host: '--alt-core-stepper-done-indicator-color', value: COLORS.icon_positive.cssValue },
]
