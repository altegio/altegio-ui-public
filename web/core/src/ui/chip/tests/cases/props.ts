import type { TPropTestCase } from '~shared/types/tests'
import {
  type IYCoreChipProps,
} from '~core/ui/chip/models/types'
import { type TYCoreChipSize } from '~core/ui/chip/models/types/external'
import { EYSizes } from '~shared/types/global'
import type { IYIcon } from '~shared/icons'
import type { TYIcons } from '~shared/icons/build/y-icons'
import { empty, text } from '~shared/tests/slotContents'
import { EYCoreTextSize } from '~core/ui/text/models/types'

export const chipIconLeftSizes: Record<TYCoreChipSize, string> = {
  [EYSizes.SMALL]: '16px',
  [EYSizes.LARGE]: '24px',
}

export const chipLabelTextSizes: Record<TYCoreChipSize, string> = {
  [EYSizes.SMALL]: EYCoreTextSize.A2_REGULAR,
  [EYSizes.LARGE]: EYCoreTextSize.P1_REGULAR,
}

export const chipIconLeftValue: IYIcon = { name: 'check' as TYIcons, data: '' } as IYIcon

export const propLabelTestCases: TPropTestCase<IYCoreChipProps, 'labelText'>[] = [
  empty,
  text,
].map((value) => ({ prop: 'labelText', case: value, value }))

export const propIconLeftTestCases: TPropTestCase<IYCoreChipProps, 'iconLeft'>[] = [
  {
    prop: 'iconLeft',
    case: 'со значением',
    value: chipIconLeftValue,
  },
]

export const propSizeTestCases: TPropTestCase<IYCoreChipProps, 'size'>[] = [
  EYSizes.SMALL as TYCoreChipSize,
  EYSizes.LARGE as TYCoreChipSize,
].map((value) => ({ prop: 'size', case: `со значением ${value}`, value }))

export const propActiveTestCases: TPropTestCase<IYCoreChipProps, 'active'>[] = [{ prop: 'active', case: 'со значением true', value: true }]

export const propDisabledTestCases: TPropTestCase<IYCoreChipProps, 'disabled'>[] = [{ prop: 'disabled', case: 'со значением true', value: true }]
