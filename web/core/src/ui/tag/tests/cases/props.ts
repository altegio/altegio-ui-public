import type { TPropTestCase } from '~shared/types/tests'
import {
  type IAltCoreTagProps,
} from '~core/ui/tag/models/types'
import { EAltSizes } from '~shared/types/global'
import { EAltCoreTagVariant, type TAltCoreTagSize } from '~core/ui/tag/models/types/external'
import type { IAltIcon } from '~shared/icons'
import type { TAltIcons } from '~shared/icons/build/alt-icons'
import { empty, text } from '~shared/tests/slotContents.ts'

export const propSizeTestCases: TPropTestCase<IAltCoreTagProps, 'size'>[] = [
  EAltSizes.SMALL as TAltCoreTagSize,
  EAltSizes.MEDIUM as TAltCoreTagSize,
  EAltSizes.LARGE as TAltCoreTagSize,
].map((value) => ({ prop: 'size', case: `with value ${value}`, value }))

export const propVariantTestCases: TPropTestCase<IAltCoreTagProps, 'variant'>[] = Object
  .values(EAltCoreTagVariant)
  .map((variant) => ({
    prop: 'variant',
    case: variant,
    value: variant,
  }))

export const propDisabledTestCases: TPropTestCase<IAltCoreTagProps, 'disabled'>[] = [
  true,
  false,
].map((value) => ({ prop: 'disabled', case: `with value ${value}`, value }))

export const propIconLeftTestCases: TPropTestCase<IAltCoreTagProps, 'iconLeft'>[] = [
  {
    prop: 'iconLeft',
    case: 'with a value',
    value: { name: 'check' as TAltIcons, data: '' } as IAltIcon,
  },
]

export const propLocatorTestCases: TPropTestCase<IAltCoreTagProps, 'locator'>[] = [
  { prop: 'locator', case: 'text', value: text, expected: text },
  { prop: 'locator', case: 'empty string', value: empty, expected: empty },
  { prop: 'locator', case: 'undefined', value: undefined, expected: undefined },
]

