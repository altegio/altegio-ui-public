import type { TPropTestCase } from '~shared/types/tests'
import type { IAltNgPhoneCodeProps } from '~ng/ui/phoneCode/models/types'
import { createNgPhoneCodeProps } from '~ng/ui/phoneCode/models/types'
import { EAltSizes } from '~shared/types/global'

const { code } = createNgPhoneCodeProps()

export const propCodeTestCases: TPropTestCase<IAltNgPhoneCodeProps, 'code'>[] = [
  { prop: 'code', case: 'with a code', value: '375' },
  { prop: 'code', case: 'with the default code', value: code },
]

export const propDisabledTestCases: TPropTestCase<IAltNgPhoneCodeProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'enabled', value: false },
  { prop: 'disabled', case: 'disabled', value: true },
]

export const propSizeTestCases: TPropTestCase<IAltNgPhoneCodeProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE },
]
