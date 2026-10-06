import type { TPropTestCase } from '~shared/types/tests'
import { EYSizes } from '~shared/types/global'
import { createVueCardRadioProps, type IYVueCardRadioProps } from '~vue/ui/cardRadio/models/types'

const {
  disabled: defaultDisabled,
  size: defaultSize,
  checked: defaultChecked,
} = createVueCardRadioProps()

export const propDisabledCases: TPropTestCase<IYVueCardRadioProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]
export const propSizeCases: TPropTestCase<IYVueCardRadioProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]
export const propCheckedCases: TPropTestCase<IYVueCardRadioProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true, expected: true },
  { prop: 'checked', case: 'false', value: false, expected: false },
  { prop: 'checked', case: 'undefined', value: undefined, expected: defaultChecked },
]
