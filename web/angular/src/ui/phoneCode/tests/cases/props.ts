import type { TPropTestCase } from '~shared/types/tests'
import type { IYNgPhoneCodeProps } from '~ng/ui/phoneCode/models/types'
import { createNgPhoneCodeProps } from '~ng/ui/phoneCode/models/types'
import { EYSizes } from '~shared/types/global'

const { code } = createNgPhoneCodeProps()

export const propCodeTestCases: TPropTestCase<IYNgPhoneCodeProps, 'code'>[] = [
  { prop: 'code', case: 'with a code', value: '375' },
  { prop: 'code', case: 'with the default code', value: code },
]

export const propDisabledTestCases: TPropTestCase<IYNgPhoneCodeProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'enabled', value: false },
  { prop: 'disabled', case: 'disabled', value: true },
]

export const propSizeTestCases: TPropTestCase<IYNgPhoneCodeProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL },
  { prop: 'size', case: 'medium', value: EYSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EYSizes.LARGE },
]
