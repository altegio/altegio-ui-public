import { COLORS } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  {
    host: '--y-core-select-field-color',
    root: '--y-core-color-text-primary',
  },
]

export const CSSVariablesHostToValueCases = [
  {
    host: '--y-core-select-field-color',
    value: COLORS.text_primary.cssValue,
  },
  {
    host: '--y-core-select-field-min-width',
    value: '88px',
  },
  {
    host: '--y-core-select-field-max-width',
    value: '404px',
  },
  {
    host: '--y-core-dropdown-content-max-width',
    value: '404px',
  },
  {
    host: '--y-core-dropdown-activator-width',
    value: '100%',
  },
  {
    host: '--y-core-dropdown-max-width',
    value: '100%',
  },
]
