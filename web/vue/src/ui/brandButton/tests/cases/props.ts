import { empty, text } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import {
    createCoreBrandButtonProps,
    EYCoreBrandButtonVariant,
} from '~core/ui/brandButton/models/types'
import type { IYVueBrandButtonProps } from '~vue/ui/brandButton/models/types'

const {
  size,
  variant,
  disabled,
} = createCoreBrandButtonProps()

export const propSizeTestCases: TPropTestCase<IYVueBrandButtonProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]

export const propVariantTestCases: TPropTestCase<IYVueBrandButtonProps, 'variant'>[] = [
  { prop: 'variant', case: 'whatsapp', value: EYCoreBrandButtonVariant.WhatsApp, expected: 'whatsapp' },
  { prop: 'variant', case: 'undefined', value: undefined, expected: variant },
]

export const propDisabledTestCases: TPropTestCase<IYVueBrandButtonProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]

export const propTextTestCases: TPropTestCase<IYVueBrandButtonProps, 'text'>[] = [
  { prop: 'text', case: 'с текстом', value: text, expected: text },
  { prop: 'text', case: 'пустая строка', value: empty, expected: empty },
]
