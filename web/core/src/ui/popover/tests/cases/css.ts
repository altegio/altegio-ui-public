import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-popover-margin-top', root: '--y-core-size-spacing-4-x' },
  { host: '--y-core-popover-action-gap', root: '--y-core-size-spacing-2-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-popover-margin-top', value: SIZES.spacing_4_x.cssValue },
  { host: '--y-core-popover-action-gap', value: SIZES.spacing_2_x.cssValue },
]
