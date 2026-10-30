import { SIZES } from '~tokens/index'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-molecule-radio-button-group-label-gap', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-molecule-radio-button-group-vertical-gap', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-molecule-radio-button-group-horizontal-gap', root: '--alt-core-size-spacing-4-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-molecule-radio-button-group-label-gap', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-molecule-radio-button-group-vertical-gap', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-molecule-radio-button-group-horizontal-gap', value: SIZES.spacing_4_x.cssValue },
]
