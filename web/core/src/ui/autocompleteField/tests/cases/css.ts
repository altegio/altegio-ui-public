import { SIZES, COLORS } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--alt-core-autocomplete-field-color', root: '--alt-core-color-text-primary' },
  { host: '--alt-core-autocomplete-field-gap', root: '--alt-core-size-spacing-x' },
  { host: '--alt-core-autocomplete-field-content-margin-top', root: '--alt-core-size-spacing-x' },
  { host: '--alt-core-autocomplete-field-loader-background-color', root: '--alt-core-color-surface-primary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--alt-core-autocomplete-field-color', value: COLORS.text_primary.cssValue },
  { host: '--alt-core-autocomplete-field-gap', value: SIZES.spacing_x.cssValue },
  { host: '--alt-core-autocomplete-field-content-margin-top', value: SIZES.spacing_x.cssValue },
  { host: '--alt-core-autocomplete-field-loader-background-color', value: COLORS.surface_primary.cssValue },
]
