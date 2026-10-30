import type { TPropTestCase } from '~shared/types/tests'
import type { TDefinedVueProps } from '~vue/utils/utility-types'
import { createVuePhoneCodeProps, type IAltVuePhoneCodeProps } from '~vue/ui/phoneCode/models/types'
import { EAltSizes } from '~shared/types/global'

const { code } = createVuePhoneCodeProps()

export const propCodeTestCases: TPropTestCase<TDefinedVueProps<IAltVuePhoneCodeProps>, 'code'>[] = [
  { prop: 'code', case: 'with a code', value: '375', expected: '375' },
  { prop: 'code', case: 'with the default code', value: code, expected: code },
]

export const propDisabledTestCases: TPropTestCase<TDefinedVueProps<IAltVuePhoneCodeProps>, 'disabled'>[] = [
  { prop: 'disabled', case: 'enabled', value: false, expected: false },
  { prop: 'disabled', case: 'disabled', value: true, expected: true },
]

export const propReadonlyTestCases: TPropTestCase<TDefinedVueProps<IAltVuePhoneCodeProps>, 'readonly'>[] = [
  { prop: 'readonly', case: 'not read-only', value: false, expected: false },
  { prop: 'readonly', case: 'read-only', value: true, expected: true },
]

export const propSizeTestCases: TPropTestCase<TDefinedVueProps<IAltVuePhoneCodeProps>, 'size'>[] = [
  { prop: 'size', case: 'small', value: 'small', expected: EAltSizes.SMALL },
  { prop: 'size', case: 'medium', value: 'medium', expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'large', value: 'large', expected: EAltSizes.LARGE },
]
