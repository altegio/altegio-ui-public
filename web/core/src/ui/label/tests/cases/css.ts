import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-label-margin-left-tooltip', root: '--y-core-size-spacing-x' },
  { host: '--y-core-label-color-tooltip', root: '--y-core-color-icon-secondary' },
  { host: '--y-core-label-color-tooltip-disabled', root: '--y-core-color-icon-tertiary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-label-margin-left-tooltip', value: SIZES.spacing_x.cssValue },
  { host: '--y-core-label-color-tooltip', value: COLORS.icon_secondary.cssValue },
  { host: '--y-core-label-color-tooltip-disabled', value: COLORS.icon_tertiary.cssValue },
]
