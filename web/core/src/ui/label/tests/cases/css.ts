import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-label-margin-left-tooltip', root: '--alt-core-size-spacing-x' },
  { host: '--alt-core-label-color-tooltip', root: '--alt-core-color-icon-secondary' },
  { host: '--alt-core-label-color-tooltip-disabled', root: '--alt-core-color-icon-tertiary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-label-margin-left-tooltip', value: SIZES.spacing_x.cssValue },
  { host: '--alt-core-label-color-tooltip', value: COLORS.icon_secondary.cssValue },
  { host: '--alt-core-label-color-tooltip-disabled', value: COLORS.icon_tertiary.cssValue },
]
