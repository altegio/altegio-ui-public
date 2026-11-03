import { COLORS } from '~root/tokens'

export const CSSVariablesDisabledCases = [
  { host: '--alt-core-button-icon-left-color-disabled', root: '--alt-core-color-icon-tertiary' },
  { host: '--alt-core-button-icon-right-color-disabled', root: '--alt-core-color-icon-tertiary' },
]

export const CSSVariablesDisabledValueCases = [
  { host: '--alt-core-button-icon-left-color-disabled', value: COLORS.icon_tertiary.cssValue },
  { host: '--alt-core-button-icon-right-color-disabled', value: COLORS.icon_tertiary.cssValue },
]

export const CSSVariablesPrimaryVariantCases = [
  { host: '--alt-core-button-icon-left-color', root: '--alt-core-color-icon-on-accent' },
  { host: '--alt-core-button-icon-right-color', root: '--alt-core-color-icon-on-accent' },
]

export const CSSVariablesPrimaryVariantValueCases = [
  { host: '--alt-core-button-icon-left-color', value: COLORS.icon_on_accent.cssValue },
  { host: '--alt-core-button-icon-right-color', value: COLORS.icon_on_accent.cssValue },
]

export const CSSVariablesOutlineVariantCases = [
  { host: '--alt-core-button-icon-left-color', root: '--alt-core-color-icon-primary' },
  { host: '--alt-core-button-icon-right-color', root: '--alt-core-color-icon-primary' },
]

export const CSSVariablesOutlineVariantValueCases = [
  { host: '--alt-core-button-icon-left-color', value: COLORS.icon_primary.cssValue },
  { host: '--alt-core-button-icon-right-color', value: COLORS.icon_primary.cssValue },
]
