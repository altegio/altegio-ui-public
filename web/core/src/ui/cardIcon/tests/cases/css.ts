import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-card-icon-small-padding-y', root: '--alt-core-size-spacing-4-x' },
  { host: '--alt-core-card-icon-small-padding-x', root: '--alt-core-size-spacing-4-x' },
  { host: '--alt-core-card-icon-medium-padding-y', root: '--alt-core-size-spacing-5-x' },
  { host: '--alt-core-card-icon-medium-padding-x', root: '--alt-core-size-spacing-5-x' },
  { host: '--alt-core-card-icon-large-padding-y', root: '--alt-core-size-spacing-5-x' },
  { host: '--alt-core-card-icon-large-padding-x', root: '--alt-core-size-spacing-5-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-card-icon-small-padding-y', value: SIZES.spacing_4_x.cssValue },
  { host: '--alt-core-card-icon-small-padding-x', value: SIZES.spacing_4_x.cssValue },
  { host: '--alt-core-card-icon-medium-padding-y', value: SIZES.spacing_5_x.cssValue },
  { host: '--alt-core-card-icon-medium-padding-x', value: SIZES.spacing_5_x.cssValue },
  { host: '--alt-core-card-icon-large-padding-y', value: SIZES.spacing_5_x.cssValue },
  { host: '--alt-core-card-icon-large-padding-x', value: SIZES.spacing_5_x.cssValue },
]
