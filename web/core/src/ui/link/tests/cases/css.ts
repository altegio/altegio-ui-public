import { COLORS } from '~root/tokens'

export const CSSVariablesHostToRootCases = [{ host: '--y-core-link-color', root: '--y-core-color-other-link' }]

export const CSSVariablesHostToValueCases = [{ host: '--y-core-link-color', value: COLORS.other_link.cssValue }]

export const CSSVariablesTextWrapCases = [
  { textWrap: true, variable: '--y-core-link-display', value: 'inline' },
  { textWrap: true, variable: '--y-core-link-text-white-space', value: 'normal' },
  { textWrap: false, variable: '--y-core-link-display', value: 'inline-flex' },
  { textWrap: false, variable: '--y-core-link-text-white-space', value: 'nowrap' },
  { textWrap: undefined, variable: '--y-core-link-display', value: 'inline-flex' },
  { textWrap: undefined, variable: '--y-core-link-text-white-space', value: 'nowrap' },
]
