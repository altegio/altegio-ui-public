import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-card-button-after-small-padding-y', root: '--alt-core-size-spacing-4-x' },
  { host: '--alt-core-card-button-after-small-padding-x', root: '--alt-core-size-spacing-4-x' },
  { host: '--alt-core-card-button-after-medium-padding-y', root: '--alt-core-size-spacing-5-x' },
  { host: '--alt-core-card-button-after-medium-padding-x', root: '--alt-core-size-spacing-5-x' },
  { host: '--alt-core-card-button-after-large-padding-y', root: '--alt-core-size-spacing-5-x' },
  { host: '--alt-core-card-button-after-large-padding-x', root: '--alt-core-size-spacing-5-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-card-button-after-small-padding-y', value: SIZES.spacing_4_x.cssValue },
  { host: '--alt-core-card-button-after-small-padding-x', value: SIZES.spacing_4_x.cssValue },
  { host: '--alt-core-card-button-after-medium-padding-y', value: SIZES.spacing_5_x.cssValue },
  { host: '--alt-core-card-button-after-medium-padding-x', value: SIZES.spacing_5_x.cssValue },
  { host: '--alt-core-card-button-after-large-padding-y', value: SIZES.spacing_5_x.cssValue },
  { host: '--alt-core-card-button-after-large-padding-x', value: SIZES.spacing_5_x.cssValue },
]
