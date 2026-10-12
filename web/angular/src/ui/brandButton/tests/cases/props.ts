import type { TPropTestCase } from '~shared/types/tests'
import {
  createCoreBrandButtonProps,
  EYCoreBrandButtonVariant,
} from '~core/ui/brandButton/models/types'
import type { IYNgBrandButtonProps } from '~ng/ui/brandButton/models/types'
import { EYSizes } from '~shared/types/global'
import { empty, text } from '~shared/tests/slotContents'

const {
  size,
  disabled,
  loading,
} = createCoreBrandButtonProps()

export const propSizeTestCases: TPropTestCase<IYNgBrandButtonProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'без значения', value: undefined, expected: size },
]

export const propVariantTestCases: TPropTestCase<IYNgBrandButtonProps, 'variant'>[] = [{ prop: 'variant', case: 'common', value: EYCoreBrandButtonVariant.WhatsApp, expected: 'whatsapp' }]

export const propDisabledTestCases: TPropTestCase<IYNgBrandButtonProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'без значения', value: undefined, expected: disabled },
]

export const propLoadingTestCases: TPropTestCase<IYNgBrandButtonProps, 'loading'>[] = [
  { prop: 'loading', case: 'true', value: true, expected: true },
  { prop: 'loading', case: 'false', value: false, expected: false },
  { prop: 'loading', case: 'без значения', value: undefined, expected: loading },
]

export const propTextTestCases: TPropTestCase<IYNgBrandButtonProps, 'text'>[] = [
  { prop: 'text', case: 'с текстом', value: text, expected: text },
  { prop: 'text', case: 'пустая строка', value: empty, expected: empty },
]
