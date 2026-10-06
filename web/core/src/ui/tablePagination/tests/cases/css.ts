import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-table-pagination-padding', root: '--y-core-size-spacing-6-x' },
  { host: '--y-core-table-pagination-gap', root: '--y-core-size-spacing-6-x' },
  { host: '--y-core-table-pagination-counter-gap', root: '--y-core-size-spacing-2-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-table-pagination-padding', value: SIZES.spacing_6_x.cssValue },
  { host: '--y-core-table-pagination-gap', value: SIZES.spacing_6_x.cssValue },
  { host: '--y-core-table-pagination-counter-gap', value: SIZES.spacing_2_x.cssValue },
]
