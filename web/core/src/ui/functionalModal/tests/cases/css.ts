import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  {
    host: '--y-core-functional-modal-max-height-offset',
    root: 'calc(4 * var(--y-core-size-spacing-10-x))',
  },
]

export const CSSVariablesHostToValueCases = [
  {
    host: '--y-core-functional-modal-max-height-offset',
    value: `calc(4 * ${SIZES.spacing_10_x.cssValue})`,
  },
]
