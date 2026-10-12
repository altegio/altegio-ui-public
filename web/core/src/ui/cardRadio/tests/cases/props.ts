import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IYCoreSimpleRadioButtonProps } from '~core/ui/simpleRadioButton/models/types'
import type { IYCoreCardRadioProps } from '~core/ui/cardRadio/models/types'

interface IYCoreCardRadioSizePropTestCase extends TPropTestCase<IYCoreCardRadioProps, 'size'> {
  expectedRadioSize: IYCoreSimpleRadioButtonProps['size']
}

export const propDisabledCases: TPropTestCase<IYCoreCardRadioProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propSizeCases: IYCoreCardRadioSizePropTestCase[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expectedRadioSize: EYSizes.SMALL },
  { prop: 'size', case: 'medium', value: EYSizes.MEDIUM, expectedRadioSize: EYSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EYSizes.LARGE, expectedRadioSize: EYSizes.MEDIUM },
]
export const propCheckedCases: TPropTestCase<IYCoreCardRadioProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true },
  { prop: 'checked', case: 'false', value: false },
]
