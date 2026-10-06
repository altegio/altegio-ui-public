import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IYCoreSimpleCheckboxProps } from '~core/ui/simpleCheckbox/models/types'
import type { IYCoreCardCheckboxProps } from '~core/ui/cardCheckbox/models/types'

interface IYCoreCardCheckboxSizePropTestCase extends TPropTestCase<IYCoreCardCheckboxProps, 'size'> {
  expectedCheckboxSize: IYCoreSimpleCheckboxProps['size']
}

export const propDisabledCases: TPropTestCase<IYCoreCardCheckboxProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propSizeCases: IYCoreCardCheckboxSizePropTestCase[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expectedCheckboxSize: EYSizes.SMALL },
  { prop: 'size', case: 'medium', value: EYSizes.MEDIUM, expectedCheckboxSize: EYSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EYSizes.LARGE, expectedCheckboxSize: EYSizes.MEDIUM },
]
export const propCheckedCases: TPropTestCase<IYCoreCardCheckboxProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true },
  { prop: 'checked', case: 'false', value: false },
]
