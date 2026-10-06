import { SIZES } from '~tokens/index'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-radio-button-group-label-gap', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-radio-button-group-vertical-gap', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-radio-button-group-horizontal-gap', root: '--y-core-size-spacing-4-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-radio-button-group-label-gap', value: SIZES.spacing_2_x.cssValue },
  { host: '--y-core-radio-button-group-vertical-gap', value: SIZES.spacing_2_x.cssValue },
  { host: '--y-core-radio-button-group-horizontal-gap', value: SIZES.spacing_4_x.cssValue },
]
