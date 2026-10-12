import { SIZES, COLORS } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  { host: '--y-core-autocomplete-field-color', root: '--y-core-color-text-primary' },
  { host: '--y-core-autocomplete-field-gap', root: '--y-core-size-spacing-x' },
  { host: '--y-core-autocomplete-field-content-margin-top', root: '--y-core-size-spacing-x' },
  { host: '--y-core-autocomplete-field-loader-background-color', root: '--y-core-color-surface-primary' },
]

export const CSSVariablesHostToValueCases = [
  { host: '--y-core-autocomplete-field-color', value: COLORS.text_primary.cssValue },
  { host: '--y-core-autocomplete-field-gap', value: SIZES.spacing_x.cssValue },
  { host: '--y-core-autocomplete-field-content-margin-top', value: SIZES.spacing_x.cssValue },
  { host: '--y-core-autocomplete-field-loader-background-color', value: COLORS.surface_primary.cssValue },
]
