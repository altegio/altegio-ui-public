import { empty, text } from '~shared/tests/slotContents'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IAltNgChipProps } from '~ng/ui/chip/models/types'
import type { IAltIcon, TAltIcons } from '~shared/icons'

export const chipIconLeftValue: IAltIcon = { name: 'check' as TAltIcons, data: '' } as IAltIcon

export const propLabelTestCases: TPropTestCase<IAltNgChipProps, 'labelText'>[] = [
  empty,
  text,
].map((value) => ({ prop: 'labelText', case: value, value }))

export const propIconLeftTestCases: TPropTestCase<IAltNgChipProps, 'iconLeft'>[] = [
  {
    prop: 'iconLeft',
    case: 'without an icon',
    value: undefined,
  },
  {
    prop: 'iconLeft',
    case: 'with an icon',
    value: chipIconLeftValue,
  },
]

export const propSizeTestCases: TPropTestCase<IAltNgChipProps, 'size'>[] = [
  EAltSizes.SMALL as IAltNgChipProps['size'],
  EAltSizes.LARGE as IAltNgChipProps['size'],
].map((value) => ({ prop: 'size', case: `${value}`, value }))

export const propActiveTestCases: TPropTestCase<IAltNgChipProps, 'active'>[] = [
  { prop: 'active', case: 'true', value: true },
  { prop: 'active', case: 'false', value: false },
]

export const propDisabledTestCases: TPropTestCase<IAltNgChipProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
