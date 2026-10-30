import { COLORS } from '~root/tokens'

export const CSSVariablesHostToRootCases = [{ host: '--alt-core-link-color', root: '--alt-core-color-other-link' }]

export const CSSVariablesHostToValueCases = [{ host: '--alt-core-link-color', value: COLORS.other_link.cssValue }]

export const CSSVariablesTextWrapCases = [
  { textWrap: true, variable: '--alt-core-link-display', value: 'inline' },
  { textWrap: true, variable: '--alt-core-link-text-white-space', value: 'normal' },
  { textWrap: false, variable: '--alt-core-link-display', value: 'inline-flex' },
  { textWrap: false, variable: '--alt-core-link-text-white-space', value: 'nowrap' },
  { textWrap: undefined, variable: '--alt-core-link-display', value: 'inline-flex' },
  { textWrap: undefined, variable: '--alt-core-link-text-white-space', value: 'nowrap' },
]
