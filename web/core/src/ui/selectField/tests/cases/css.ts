import { COLORS } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  {
    host: '--alt-core-select-field-color',
    root: '--alt-core-color-text-primary',
  },
]

export const CSSVariablesHostToValueCases = [
  {
    host: '--alt-core-select-field-color',
    value: COLORS.text_primary.cssValue,
  },
  {
    host: '--alt-core-select-field-min-width',
    value: '88px',
  },
  {
    host: '--alt-core-select-field-max-width',
    value: '404px',
  },
  {
    host: '--alt-core-dropdown-content-max-width',
    value: '404px',
  },
  {
    host: '--alt-core-dropdown-activator-width',
    value: '100%',
  },
  {
    host: '--alt-core-dropdown-max-width',
    value: '100%',
  },
]
