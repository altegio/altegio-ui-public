import type { TPropTestCase } from '~shared/types/tests'
import { EAltSizes } from '~shared/types/global'
import { createVueCardCheckboxProps, type IAltVueCardCheckboxProps } from '~vue/ui/cardCheckbox/models/types'

const {
  disabled: defaultDisabled,
  size: defaultSize,
  checked: defaultChecked,
} = createVueCardCheckboxProps()

export const propDisabledCases: TPropTestCase<IAltVueCardCheckboxProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]
export const propSizeCases: TPropTestCase<IAltVueCardCheckboxProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]
export const propCheckedCases: TPropTestCase<IAltVueCardCheckboxProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true, expected: true },
  { prop: 'checked', case: 'false', value: false, expected: false },
  { prop: 'checked', case: 'undefined', value: undefined, expected: defaultChecked },
]
