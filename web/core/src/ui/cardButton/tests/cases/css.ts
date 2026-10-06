import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-card-button-after-small-padding-y', root: '--y-core-size-spacing-4-x' },
  { host: '--y-core-card-button-after-small-padding-x', root: '--y-core-size-spacing-4-x' },
  { host: '--y-core-card-button-after-medium-padding-y', root: '--y-core-size-spacing-5-x' },
  { host: '--y-core-card-button-after-medium-padding-x', root: '--y-core-size-spacing-5-x' },
  { host: '--y-core-card-button-after-large-padding-y', root: '--y-core-size-spacing-5-x' },
  { host: '--y-core-card-button-after-large-padding-x', root: '--y-core-size-spacing-5-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-card-button-after-small-padding-y', value: SIZES.spacing_4_x.cssValue },
  { host: '--y-core-card-button-after-small-padding-x', value: SIZES.spacing_4_x.cssValue },
  { host: '--y-core-card-button-after-medium-padding-y', value: SIZES.spacing_5_x.cssValue },
  { host: '--y-core-card-button-after-medium-padding-x', value: SIZES.spacing_5_x.cssValue },
  { host: '--y-core-card-button-after-large-padding-y', value: SIZES.spacing_5_x.cssValue },
  { host: '--y-core-card-button-after-large-padding-x', value: SIZES.spacing_5_x.cssValue },
]
