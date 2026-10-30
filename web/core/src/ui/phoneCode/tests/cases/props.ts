import type { TPropTestCase } from '~shared/types/tests'
import type { IAltCorePhoneCodeProps } from '~core/ui/phoneCode/models/types'
import { createCorePhoneCodeProps } from '~core/ui/phoneCode/models/types'
import { EAltSizes } from '~shared/types/global'

const { code } = createCorePhoneCodeProps()

export const propCodeTestCases: TPropTestCase<IAltCorePhoneCodeProps, 'code'>[] = [
  { prop: 'code', case: 'with a code', value: '375' },
  { prop: 'code', case: 'with the default code', value: code },
]

export const propDisabledTestCases: TPropTestCase<IAltCorePhoneCodeProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'enabled', value: false },
  { prop: 'disabled', case: 'disabled', value: true },
]

export const propReadonlyTestCases: TPropTestCase<IAltCorePhoneCodeProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'not read-only', value: false },
  { prop: 'readonly', case: 'read-only', value: true },
]

export const propSizeTestCases: TPropTestCase<IAltCorePhoneCodeProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE },
]
