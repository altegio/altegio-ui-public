import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-loader-color-black', root: '--alt-core-color-icon-primary' },
  { host: '--alt-core-loader-color-white', root: '--alt-core-color-other-contrast' },
  { host: '--alt-core-loader-color-yellow', root: '--alt-core-color-icon-accent' },
  { host: '--alt-core-loader-size-extra-small', root: '--alt-core-size-spacing-4-x' },
  { host: '--alt-core-loader-size-small', root: '--alt-core-size-spacing-5-x' },
  { host: '--alt-core-loader-size-medium', root: '--alt-core-size-spacing-6-x' },
  { host: '--alt-core-loader-size-large', root: '--alt-core-size-spacing-8-x' },
  { host: '--alt-core-loader-size-extra-large', root: '--alt-core-size-spacing-12-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-loader-color-black', value: COLORS.icon_primary.cssValue },
  { host: '--alt-core-loader-color-white', value: COLORS.other_contrast.cssValue },
  { host: '--alt-core-loader-color-yellow', value: COLORS.icon_accent.cssValue },
  { host: '--alt-core-loader-size-extra-small', value: SIZES.spacing_4_x.cssValue },
  { host: '--alt-core-loader-size-small', value: SIZES.spacing_5_x.cssValue },
  { host: '--alt-core-loader-size-medium', value: SIZES.spacing_6_x.cssValue },
  { host: '--alt-core-loader-size-large', value: SIZES.spacing_8_x.cssValue },
  { host: '--alt-core-loader-size-extra-large', value: SIZES.spacing_12_x.cssValue },
]
