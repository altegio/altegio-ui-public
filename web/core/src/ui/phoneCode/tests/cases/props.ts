import type { TPropTestCase } from '~shared/types/tests'
import type { IYCorePhoneCodeProps } from '~core/ui/phoneCode/models/types'
import { createCorePhoneCodeProps } from '~core/ui/phoneCode/models/types'
import { EYSizes } from '~shared/types/global'

const { code } = createCorePhoneCodeProps()

export const propCodeTestCases: TPropTestCase<IYCorePhoneCodeProps, 'code'>[] = [
  { prop: 'code', case: 'with a code', value: '375' },
  { prop: 'code', case: 'with the default code', value: code },
]

export const propDisabledTestCases: TPropTestCase<IYCorePhoneCodeProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'enabled', value: false },
  { prop: 'disabled', case: 'disabled', value: true },
]

export const propReadonlyTestCases: TPropTestCase<IYCorePhoneCodeProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'not read-only', value: false },
  { prop: 'readonly', case: 'read-only', value: true },
]

export const propSizeTestCases: TPropTestCase<IYCorePhoneCodeProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL },
  { prop: 'size', case: 'medium', value: EYSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EYSizes.LARGE },
]
