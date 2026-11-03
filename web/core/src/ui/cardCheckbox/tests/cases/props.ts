import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IAltCoreSimpleCheckboxProps } from '~core/ui/simpleCheckbox/models/types'
import type { IAltCoreCardCheckboxProps } from '~core/ui/cardCheckbox/models/types'

interface IAltCoreCardCheckboxSizePropTestCase extends TPropTestCase<IAltCoreCardCheckboxProps, 'size'> {
  expectedCheckboxSize: IAltCoreSimpleCheckboxProps['size']
}

export const propDisabledCases: TPropTestCase<IAltCoreCardCheckboxProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propSizeCases: IAltCoreCardCheckboxSizePropTestCase[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL, expectedCheckboxSize: EAltSizes.SMALL },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM, expectedCheckboxSize: EAltSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE, expectedCheckboxSize: EAltSizes.MEDIUM },
]
export const propCheckedCases: TPropTestCase<IAltCoreCardCheckboxProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true },
  { prop: 'checked', case: 'false', value: false },
]
