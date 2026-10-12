import type { TPropTestCase } from '~shared/types/tests'
import type { TDefinedVueProps } from '~vue/utils/utility-types'
import { createVuePhoneCodeProps, type IYVuePhoneCodeProps } from '~vue/ui/phoneCode/models/types'
import { EYSizes } from '~shared/types/global'

const { code } = createVuePhoneCodeProps()

export const propCodeTestCases: TPropTestCase<TDefinedVueProps<IYVuePhoneCodeProps>, 'code'>[] = [
  { prop: 'code', case: 'с кодом', value: '375', expected: '375' },
  { prop: 'code', case: 'с дефолтным кодом', value: code, expected: code },
]

export const propDisabledTestCases: TPropTestCase<TDefinedVueProps<IYVuePhoneCodeProps>, 'disabled'>[] = [
  { prop: 'disabled', case: 'включен', value: false, expected: false },
  { prop: 'disabled', case: 'выключен', value: true, expected: true },
]

export const propReadonlyTestCases: TPropTestCase<TDefinedVueProps<IYVuePhoneCodeProps>, 'readonly'>[] = [
  { prop: 'readonly', case: 'не только для чтения', value: false, expected: false },
  { prop: 'readonly', case: 'только для чтения', value: true, expected: true },
]

export const propSizeTestCases: TPropTestCase<TDefinedVueProps<IYVuePhoneCodeProps>, 'size'>[] = [
  { prop: 'size', case: 'small', value: 'small', expected: EYSizes.SMALL },
  { prop: 'size', case: 'medium', value: 'medium', expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'large', value: 'large', expected: EYSizes.LARGE },
]
