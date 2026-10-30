import { SIZES, COLORS } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-phone-field-color', root: '--alt-core-color-text-primary' },
  { host: '--alt-core-phone-field-gap', root: '--alt-core-size-spacing-x' },
  { host: '--alt-core-phone-field-content-margin-top', root: '--alt-core-size-spacing-x' },
  { host: '--alt-core-phone-field-loader-background-color', root: '--alt-core-color-surface-primary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-phone-field-color', value: COLORS.text_primary.cssValue },
  { host: '--alt-core-phone-field-gap', value: SIZES.spacing_x.cssValue },
  { host: '--alt-core-phone-field-content-margin-top', value: SIZES.spacing_x.cssValue },
  { host: '--alt-core-phone-field-loader-background-color', value: COLORS.surface_primary.cssValue },
]
