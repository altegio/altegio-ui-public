import { COLORS } from '~root/tokens'

export const CSSVariablesDisabledCases = [
  { host: '--y-core-button-icon-left-color-disabled', root: '--y-core-color-icon-tertiary' },
  { host: '--y-core-button-icon-right-color-disabled', root: '--y-core-color-icon-tertiary' },
]

export const CSSVariablesDisabledValueCases = [
  { host: '--y-core-button-icon-left-color-disabled', value: COLORS.icon_tertiary.cssValue },
  { host: '--y-core-button-icon-right-color-disabled', value: COLORS.icon_tertiary.cssValue },
]

export const CSSVariablesPrimaryVariantCases = [
  { host: '--y-core-button-icon-left-color', root: '--y-core-color-icon-on-accent' },
  { host: '--y-core-button-icon-right-color', root: '--y-core-color-icon-on-accent' },
]

export const CSSVariablesPrimaryVariantValueCases = [
  { host: '--y-core-button-icon-left-color', value: COLORS.icon_on_accent.cssValue },
  { host: '--y-core-button-icon-right-color', value: COLORS.icon_on_accent.cssValue },
]

export const CSSVariablesOutlineVariantCases = [
  { host: '--y-core-button-icon-left-color', root: '--y-core-color-icon-primary' },
  { host: '--y-core-button-icon-right-color', root: '--y-core-color-icon-primary' },
]

export const CSSVariablesOutlineVariantValueCases = [
  { host: '--y-core-button-icon-left-color', value: COLORS.icon_primary.cssValue },
  { host: '--y-core-button-icon-right-color', value: COLORS.icon_primary.cssValue },
]
