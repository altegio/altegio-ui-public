import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-table-pagination-padding', root: '--alt-core-size-spacing-6-x' },
  { host: '--alt-core-table-pagination-gap', root: '--alt-core-size-spacing-6-x' },
  { host: '--alt-core-table-pagination-counter-gap', root: '--alt-core-size-spacing-2-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-table-pagination-padding', value: SIZES.spacing_6_x.cssValue },
  { host: '--alt-core-table-pagination-gap', value: SIZES.spacing_6_x.cssValue },
  { host: '--alt-core-table-pagination-counter-gap', value: SIZES.spacing_2_x.cssValue },
]
