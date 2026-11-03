import { SIZES } from '~root/tokens'

export const CSSVariablesHostToRootCases = [
  {
    host: '--alt-core-date-picker-calendar-padding-x',
    root: '--alt-core-size-spacing-5-x',
  },
  {
    host: '--alt-core-date-picker-calendar-padding-y',
    root: '--alt-core-size-spacing-4-x',
  },
]

export const CSSVariablesHostToValueCases = [
  {
    host: '--alt-core-date-picker-calendar-padding-x',
    value: SIZES.spacing_5_x.cssValue,
  },
  {
    host: '--alt-core-date-picker-calendar-padding-y',
    value: SIZES.spacing_4_x.cssValue,
  },
]
