import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  {
    host: '--y-core-date-picker-calendar-padding-x',
    root: '--y-core-size-spacing-5-x',
  },
  {
    host: '--y-core-date-picker-calendar-padding-y',
    root: '--y-core-size-spacing-4-x',
  },
]

export const CSSVariablesHostToValueCases = [
  {
    host: '--y-core-date-picker-calendar-padding-x',
    value: SIZES.spacing_5_x.cssValue,
  },
  {
    host: '--y-core-date-picker-calendar-padding-y',
    value: SIZES.spacing_4_x.cssValue,
  },
]
