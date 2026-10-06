import type { TPropTestCase } from '~shared/types/tests'
import { EYSizes } from '~shared/types/global'
import { createNgCardCheckboxProps, type IYNgCardCheckboxProps } from '~ng/ui/cardCheckbox/models/types'

const {
  checked: defaultChecked,
  disabled: defaultDisabled,
  size: defaultSize,
} = createNgCardCheckboxProps()

export const propCheckedCases: TPropTestCase<IYNgCardCheckboxProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true, expected: true },
  { prop: 'checked', case: 'false', value: false, expected: false },
  { prop: 'checked', case: 'undefined', value: undefined, expected: defaultChecked },
]
export const propDisabledCases: TPropTestCase<IYNgCardCheckboxProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]
export const propSizeCases: TPropTestCase<IYNgCardCheckboxProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]
