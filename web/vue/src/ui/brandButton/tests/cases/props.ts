import { empty, text } from '~shared/tests/slotContents'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import {
    createCoreBrandButtonProps,
    EAltCoreBrandButtonVariant,
} from '~core/ui/brandButton/models/types'
import type { IAltVueBrandButtonProps } from '~vue/ui/brandButton/models/types'

const {
  size,
  variant,
  disabled,
} = createCoreBrandButtonProps()

export const propSizeTestCases: TPropTestCase<IAltVueBrandButtonProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]

export const propVariantTestCases: TPropTestCase<IAltVueBrandButtonProps, 'variant'>[] = [
  { prop: 'variant', case: 'whatsapp', value: EAltCoreBrandButtonVariant.WhatsApp, expected: 'whatsapp' },
  { prop: 'variant', case: 'undefined', value: undefined, expected: variant },
]

export const propDisabledTestCases: TPropTestCase<IAltVueBrandButtonProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]

export const propTextTestCases: TPropTestCase<IAltVueBrandButtonProps, 'text'>[] = [
  { prop: 'text', case: 'with text', value: text, expected: text },
  { prop: 'text', case: 'empty string', value: empty, expected: empty },
]
