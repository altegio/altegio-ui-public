import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-popover-margin-top', root: '--alt-core-size-spacing-4-x' },
  { host: '--alt-core-popover-action-gap', root: '--alt-core-size-spacing-2-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-popover-margin-top', value: SIZES.spacing_4_x.cssValue },
  { host: '--alt-core-popover-action-gap', value: SIZES.spacing_2_x.cssValue },
]
