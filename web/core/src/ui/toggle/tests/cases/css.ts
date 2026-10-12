import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-toggle-x-gap', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-toggle-info-gap', root: '--y-core-size-spacing-0-5-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-toggle-x-gap', value: SIZES.spacing_2_x.cssValue },
  { host: '--y-core-toggle-info-gap', value: SIZES.spacing_0_5_x.cssValue },
]
