import { COLORS, SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-field-icon-default-color', root: '--y-core-color-icon-secondary' },
  { host: '--y-core-field-icon-disabled-color', root: '--y-core-color-icon-tertiary' },
  { host: '--y-core-field-icon-hover-color', root: '--y-core-color-icon-primary' },
  { host: '--y-core-field-icon-size-small-padding-x', root: '--y-core-size-spacing-2-5-x' },
  { host: '--y-core-field-icon-size-small-padding-y', root: '--y-core-size-spacing-2-x' },
  { host: '--y-core-field-icon-size-medium-padding-x', root: '--y-core-size-spacing-2-5-x' },
  { host: '--y-core-field-icon-size-medium-padding-y', root: '--y-core-size-spacing-2-5-x' },
  { host: '--y-core-field-icon-size-large-padding-x', root: '--y-core-size-spacing-2-5-x' },
  { host: '--y-core-field-icon-size-large-padding-y', root: '--y-core-size-spacing-3-x' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-field-icon-default-color', value: COLORS.icon_secondary.cssValue },
  { host: '--y-core-field-icon-disabled-color', value: COLORS.icon_tertiary.cssValue },
  { host: '--y-core-field-icon-hover-color', value: COLORS.icon_primary.cssValue },
  { host: '--y-core-field-icon-size-small-padding-x', value: SIZES.spacing_2_5_x.cssValue },
  { host: '--y-core-field-icon-size-small-padding-y', value: SIZES.spacing_2_x.cssValue },
  { host: '--y-core-field-icon-size-medium-padding-x', value: SIZES.spacing_2_5_x.cssValue },
  { host: '--y-core-field-icon-size-medium-padding-y', value: SIZES.spacing_2_5_x.cssValue },
  { host: '--y-core-field-icon-size-large-padding-x', value: SIZES.spacing_2_5_x.cssValue },
  { host: '--y-core-field-icon-size-large-padding-y', value: SIZES.spacing_3_x.cssValue },
]
