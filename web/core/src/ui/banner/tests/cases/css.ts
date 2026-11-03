import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-banner-gap', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-banner-padding-x', root: '--alt-core-size-spacing-4-x' },
  { host: '--alt-core-banner-padding-y', root: '--alt-core-size-spacing-3-x' },
  { host: '--alt-core-banner-border-radius', root: '--alt-core-size-radius-2-x' },
  { host: '--alt-core-banner-color', root: '--alt-core-color-text-primary' },
  { host: '--alt-core-banner-invert-color', root: '--alt-core-color-other-contrast' },
  { host: '--alt-core-banner-information-background-color', root: '--alt-core-color-calm-surface-blue-low' },
  { host: '--alt-core-banner-success-background-color', root: '--alt-core-color-calm-surface-green-low' },
  { host: '--alt-core-banner-warning-background-color', root: '--alt-core-color-calm-surface-orange-low' },
  { host: '--alt-core-banner-danger-background-color', root: '--alt-core-color-calm-surface-red-low' },
  { host: '--alt-core-banner-invert-background-color', root: '--alt-core-color-other-invert' },
  { host: '--alt-core-banner-information-icon-color', root: '--alt-core-color-calm-icon-blue' },
  { host: '--alt-core-banner-danger-icon-color', root: '--alt-core-color-calm-icon-red' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-banner-gap', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-banner-padding-x', value: SIZES.spacing_4_x.cssValue },
  { host: '--alt-core-banner-padding-y', value: SIZES.spacing_3_x.cssValue },
  { host: '--alt-core-banner-border-radius', value: SIZES.radius_2_x.cssValue },
  { host: '--alt-core-banner-color', value: COLORS.text_primary.cssValue },
  { host: '--alt-core-banner-invert-background-color', value: COLORS.other_invert.cssValue },
]
