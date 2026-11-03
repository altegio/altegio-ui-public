import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-radio-button-x-gap', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-radio-button-info-gap', root: '--alt-core-size-spacing-0-5-x' },
  { host: '--alt-core-radio-button-error-margin-top', root: '--alt-core-size-spacing-0-5-x' },
  { host: '--alt-core-radio-button-small-error-margin-left', root: '--alt-core-size-spacing-7-x' },
  { host: '--alt-core-radio-button-medium-error-margin-left', root: '--alt-core-size-spacing-8-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-radio-button-x-gap', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-radio-button-info-gap', value: SIZES.spacing_0_5_x.cssValue },
  { host: '--alt-core-radio-button-error-margin-top', value: SIZES.spacing_0_5_x.cssValue },
  { host: '--alt-core-radio-button-small-error-margin-left', value: SIZES.spacing_7_x.cssValue },
  { host: '--alt-core-radio-button-medium-error-margin-left', value: SIZES.spacing_8_x.cssValue },
]
