import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-card-main-size-small-gap', root: '--y-core-size-spacing-x' },
  { host: '--y-core-card-main-size-small-padding-y', root: '--y-core-size-spacing-4-x' },
  { host: '--y-core-card-main-size-small-padding-x', root: '--y-core-size-spacing-4-x' },
  { host: '--y-core-card-main-size-medium-gap', root: '--y-core-size-spacing-x' },
  { host: '--y-core-card-main-size-medium-padding-y', root: '--y-core-size-spacing-5-x' },
  { host: '--y-core-card-main-size-medium-padding-x', root: '--y-core-size-spacing-5-x' },
  { host: '--y-core-card-main-size-large-gap', root: '--y-core-size-spacing-x' },
  { host: '--y-core-card-main-size-large-padding-y', root: '--y-core-size-spacing-5-x' },
  { host: '--y-core-card-main-size-large-padding-x', root: '--y-core-size-spacing-5-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-card-main-size-small-gap', value: SIZES.spacing_x.cssValue },
  { host: '--y-core-card-main-size-small-padding-y', value: SIZES.spacing_4_x.cssValue },
  { host: '--y-core-card-main-size-small-padding-x', value: SIZES.spacing_4_x.cssValue },
  { host: '--y-core-card-main-size-medium-gap', value: SIZES.spacing_x.cssValue },
  { host: '--y-core-card-main-size-medium-padding-y', value: SIZES.spacing_5_x.cssValue },
  { host: '--y-core-card-main-size-medium-padding-x', value: SIZES.spacing_5_x.cssValue },
  { host: '--y-core-card-main-size-large-gap', value: SIZES.spacing_x.cssValue },
  { host: '--y-core-card-main-size-large-padding-y', value: SIZES.spacing_5_x.cssValue },
  { host: '--y-core-card-main-size-large-padding-x', value: SIZES.spacing_5_x.cssValue },
]
