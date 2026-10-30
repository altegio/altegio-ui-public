import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IAltCoreSimpleRadioButtonProps } from '~core/ui/simpleRadioButton/models/types'
import type { IAltCoreCardRadioProps } from '~core/ui/cardRadio/models/types'

interface IAltCoreCardRadioSizePropTestCase extends TPropTestCase<IAltCoreCardRadioProps, 'size'> {
  expectedRadioSize: IAltCoreSimpleRadioButtonProps['size']
}

export const propDisabledCases: TPropTestCase<IAltCoreCardRadioProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propSizeCases: IAltCoreCardRadioSizePropTestCase[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL, expectedRadioSize: EAltSizes.SMALL },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM, expectedRadioSize: EAltSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE, expectedRadioSize: EAltSizes.MEDIUM },
]
export const propCheckedCases: TPropTestCase<IAltCoreCardRadioProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true },
  { prop: 'checked', case: 'false', value: false },
]
