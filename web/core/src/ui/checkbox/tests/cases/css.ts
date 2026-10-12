import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-checkbox-x-gap', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-checkbox-info-gap', root: '--y-core-size-spacing-0-5-x' },
  { host: '--y-core-checkbox-error-margin-top', root: '--y-core-size-spacing-0-5-x' },
  { host: '--y-core-checkbox-small-error-margin-left', root: '--y-core-size-spacing-7-x' },
  { host: '--y-core-checkbox-medium-error-margin-left', root: '--y-core-size-spacing-8-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-checkbox-x-gap', value: SIZES.spacing_2_x.cssValue },
  { host: '--y-core-checkbox-info-gap', value: SIZES.spacing_0_5_x.cssValue },
  { host: '--y-core-checkbox-error-margin-top', value: SIZES.spacing_0_5_x.cssValue },
  { host: '--y-core-checkbox-small-error-margin-left', value: SIZES.spacing_7_x.cssValue },
  { host: '--y-core-checkbox-medium-error-margin-left', value: SIZES.spacing_8_x.cssValue },
]
