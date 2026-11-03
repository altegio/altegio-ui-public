import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-rating-gap', root: '--alt-core-size-spacing-0-5-x' },
  { host: '--alt-core-rating-star-border-radius', root: '--alt-core-size-radius-x' },
  { host: '--alt-core-rating-filled-color', root: '--alt-core-color-icon-warning' },
  { host: '--alt-core-rating-empty-color', root: '--alt-core-color-icon-tertiary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-rating-gap', value: SIZES.spacing_0_5_x.cssValue },
  { host: '--alt-core-rating-filled-color', value: COLORS.icon_warning.cssValue },
  { host: '--alt-core-rating-empty-color', value: COLORS.icon_tertiary.cssValue },
]
