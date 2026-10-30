import type { TPropTestCase } from '~shared/types/tests'
import {
  createCoreBrandButtonProps,
  EAltCoreBrandButtonVariant,
} from '~core/ui/brandButton/models/types'
import type { IAltNgBrandButtonProps } from '~ng/ui/brandButton/models/types'
import { EAltSizes } from '~shared/types/global'
import { empty, text } from '~shared/tests/slotContents'

const {
  size,
  disabled,
  loading,
} = createCoreBrandButtonProps()

export const propSizeTestCases: TPropTestCase<IAltNgBrandButtonProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'without a value', value: undefined, expected: size },
]

export const propVariantTestCases: TPropTestCase<IAltNgBrandButtonProps, 'variant'>[] = [{ prop: 'variant', case: 'common', value: EAltCoreBrandButtonVariant.WhatsApp, expected: 'whatsapp' }]

export const propDisabledTestCases: TPropTestCase<IAltNgBrandButtonProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'without a value', value: undefined, expected: disabled },
]

export const propLoadingTestCases: TPropTestCase<IAltNgBrandButtonProps, 'loading'>[] = [
  { prop: 'loading', case: 'true', value: true, expected: true },
  { prop: 'loading', case: 'false', value: false, expected: false },
  { prop: 'loading', case: 'without a value', value: undefined, expected: loading },
]

export const propTextTestCases: TPropTestCase<IAltNgBrandButtonProps, 'text'>[] = [
  { prop: 'text', case: 'with text', value: text, expected: text },
  { prop: 'text', case: 'empty string', value: empty, expected: empty },
]
