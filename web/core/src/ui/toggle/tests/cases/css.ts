import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-toggle-x-gap', root: '--alt-core-size-spacing-2-x' },
  { host: '--alt-core-toggle-info-gap', root: '--alt-core-size-spacing-0-5-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-toggle-x-gap', value: SIZES.spacing_2_x.cssValue },
  { host: '--alt-core-toggle-info-gap', value: SIZES.spacing_0_5_x.cssValue },
]
