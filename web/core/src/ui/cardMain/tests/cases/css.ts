import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-card-main-size-small-gap', root: '--alt-core-size-spacing-x' },
  { host: '--alt-core-card-main-size-small-padding-y', root: '--alt-core-size-spacing-4-x' },
  { host: '--alt-core-card-main-size-small-padding-x', root: '--alt-core-size-spacing-4-x' },
  { host: '--alt-core-card-main-size-medium-gap', root: '--alt-core-size-spacing-x' },
  { host: '--alt-core-card-main-size-medium-padding-y', root: '--alt-core-size-spacing-5-x' },
  { host: '--alt-core-card-main-size-medium-padding-x', root: '--alt-core-size-spacing-5-x' },
  { host: '--alt-core-card-main-size-large-gap', root: '--alt-core-size-spacing-x' },
  { host: '--alt-core-card-main-size-large-padding-y', root: '--alt-core-size-spacing-5-x' },
  { host: '--alt-core-card-main-size-large-padding-x', root: '--alt-core-size-spacing-5-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-card-main-size-small-gap', value: SIZES.spacing_x.cssValue },
  { host: '--alt-core-card-main-size-small-padding-y', value: SIZES.spacing_4_x.cssValue },
  { host: '--alt-core-card-main-size-small-padding-x', value: SIZES.spacing_4_x.cssValue },
  { host: '--alt-core-card-main-size-medium-gap', value: SIZES.spacing_x.cssValue },
  { host: '--alt-core-card-main-size-medium-padding-y', value: SIZES.spacing_5_x.cssValue },
  { host: '--alt-core-card-main-size-medium-padding-x', value: SIZES.spacing_5_x.cssValue },
  { host: '--alt-core-card-main-size-large-gap', value: SIZES.spacing_x.cssValue },
  { host: '--alt-core-card-main-size-large-padding-y', value: SIZES.spacing_5_x.cssValue },
  { host: '--alt-core-card-main-size-large-padding-x', value: SIZES.spacing_5_x.cssValue },
]
