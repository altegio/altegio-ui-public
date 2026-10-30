import type { TPropTestCase } from '~shared/types/tests'
import { EAltSizes } from '~shared/types/global'
import { createNgCardCheckboxProps, type IAltNgCardCheckboxProps } from '~ng/ui/cardCheckbox/models/types'

const {
  checked: defaultChecked,
  disabled: defaultDisabled,
  size: defaultSize,
} = createNgCardCheckboxProps()

export const propCheckedCases: TPropTestCase<IAltNgCardCheckboxProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true, expected: true },
  { prop: 'checked', case: 'false', value: false, expected: false },
  { prop: 'checked', case: 'undefined', value: undefined, expected: defaultChecked },
]
export const propDisabledCases: TPropTestCase<IAltNgCardCheckboxProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]
export const propSizeCases: TPropTestCase<IAltNgCardCheckboxProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]
