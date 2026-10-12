import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-card-icon-small-padding-y', root: '--y-core-size-spacing-4-x' },
  { host: '--y-core-card-icon-small-padding-x', root: '--y-core-size-spacing-4-x' },
  { host: '--y-core-card-icon-medium-padding-y', root: '--y-core-size-spacing-5-x' },
  { host: '--y-core-card-icon-medium-padding-x', root: '--y-core-size-spacing-5-x' },
  { host: '--y-core-card-icon-large-padding-y', root: '--y-core-size-spacing-5-x' },
  { host: '--y-core-card-icon-large-padding-x', root: '--y-core-size-spacing-5-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-card-icon-small-padding-y', value: SIZES.spacing_4_x.cssValue },
  { host: '--y-core-card-icon-small-padding-x', value: SIZES.spacing_4_x.cssValue },
  { host: '--y-core-card-icon-medium-padding-y', value: SIZES.spacing_5_x.cssValue },
  { host: '--y-core-card-icon-medium-padding-x', value: SIZES.spacing_5_x.cssValue },
  { host: '--y-core-card-icon-large-padding-y', value: SIZES.spacing_5_x.cssValue },
  { host: '--y-core-card-icon-large-padding-x', value: SIZES.spacing_5_x.cssValue },
]
