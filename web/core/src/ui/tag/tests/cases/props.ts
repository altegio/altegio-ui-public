import type { TPropTestCase } from '~shared/types/tests'
import {
  type IYCoreTagProps,
} from '~core/ui/tag/models/types'
import { EYSizes } from '~shared/types/global'
import { EYCoreTagVariant, type TYCoreTagSize } from '~core/ui/tag/models/types/external'
import type { IYIcon } from '~shared/icons'
import type { TYIcons } from '~shared/icons/build/y-icons'
import { empty, text } from '~shared/tests/slotContents.ts'

export const propSizeTestCases: TPropTestCase<IYCoreTagProps, 'size'>[] = [
  EYSizes.SMALL as TYCoreTagSize,
  EYSizes.MEDIUM as TYCoreTagSize,
  EYSizes.LARGE as TYCoreTagSize,
].map((value) => ({ prop: 'size', case: `со значением ${value}`, value }))

export const propVariantTestCases: TPropTestCase<IYCoreTagProps, 'variant'>[] = Object
  .values(EYCoreTagVariant)
  .map((variant) => ({
    prop: 'variant',
    case: variant,
    value: variant,
  }))

export const propDisabledTestCases: TPropTestCase<IYCoreTagProps, 'disabled'>[] = [
  true,
  false,
].map((value) => ({ prop: 'disabled', case: `со значением ${value}`, value }))

export const propIconLeftTestCases: TPropTestCase<IYCoreTagProps, 'iconLeft'>[] = [
  {
    prop: 'iconLeft',
    case: 'со значением',
    value: { name: 'check' as TYIcons, data: '' } as IYIcon,
  },
]

export const propLocatorTestCases: TPropTestCase<IYCoreTagProps, 'locator'>[] = [
  { prop: 'locator', case: 'текст', value: text, expected: text },
  { prop: 'locator', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'locator', case: 'undefined', value: undefined, expected: undefined },
]

