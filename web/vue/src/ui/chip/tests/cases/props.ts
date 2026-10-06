import { empty, text } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IYVueChipProps } from '~vue/ui/chip/models/types'
import type { IYIcon, TYIcons } from '~shared/icons'

export const chipIconLeftValue: IYIcon = { name: 'check' as TYIcons, data: '' } as IYIcon

export const propLabelTestCases: TPropTestCase<IYVueChipProps, 'labelText'>[] = [
  empty,
  text,
].map((value) => ({ prop: 'labelText', case: value, value }))

export const propIconLeftTestCases: TPropTestCase<IYVueChipProps, 'iconLeft'>[] = [
  {
    prop: 'iconLeft',
    case: 'без иконки',
    value: undefined,
  },
  {
    prop: 'iconLeft',
    case: 'с иконкой',
    value: chipIconLeftValue,
  },
]

export const propSizeTestCases: TPropTestCase<IYVueChipProps, 'size'>[] = [
  EYSizes.SMALL as IYVueChipProps['size'],
  EYSizes.LARGE as IYVueChipProps['size'],
].map((value) => ({ prop: 'size', case: `${value}`, value }))

export const propActiveTestCases: TPropTestCase<IYVueChipProps, 'active'>[] = [
  { prop: 'active', case: 'true', value: true },
  { prop: 'active', case: 'false', value: false },
]

export const propDisabledTestCases: TPropTestCase<IYVueChipProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
