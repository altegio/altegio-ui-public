import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-loader-color-black', root: '--y-core-color-icon-primary' },
  { host: '--y-core-loader-color-white', root: '--y-core-color-other-contrast' },
  { host: '--y-core-loader-color-yellow', root: '--y-core-color-icon-accent' },
  { host: '--y-core-loader-size-extra-small', root: '--y-core-size-spacing-4-x' },
  { host: '--y-core-loader-size-small', root: '--y-core-size-spacing-5-x' },
  { host: '--y-core-loader-size-medium', root: '--y-core-size-spacing-6-x' },
  { host: '--y-core-loader-size-large', root: '--y-core-size-spacing-8-x' },
  { host: '--y-core-loader-size-extra-large', root: '--y-core-size-spacing-12-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-loader-color-black', value: COLORS.icon_primary.cssValue },
  { host: '--y-core-loader-color-white', value: COLORS.other_contrast.cssValue },
  { host: '--y-core-loader-color-yellow', value: COLORS.icon_accent.cssValue },
  { host: '--y-core-loader-size-extra-small', value: SIZES.spacing_4_x.cssValue },
  { host: '--y-core-loader-size-small', value: SIZES.spacing_5_x.cssValue },
  { host: '--y-core-loader-size-medium', value: SIZES.spacing_6_x.cssValue },
  { host: '--y-core-loader-size-large', value: SIZES.spacing_8_x.cssValue },
  { host: '--y-core-loader-size-extra-large', value: SIZES.spacing_12_x.cssValue },
]
