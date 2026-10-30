import type { TPropTestCase } from '~shared/types/tests'
import {
  type IAltCoreChipProps,
} from '~core/ui/chip/models/types'
import { type TAltCoreChipSize } from '~core/ui/chip/models/types/external'
import { EAltSizes } from '~shared/types/global'
import type { IAltIcon } from '~shared/icons'
import type { TAltIcons } from '~shared/icons/build/alt-icons'
import { empty, text } from '~shared/tests/slotContents'
import { EAltCoreTextSize } from '~core/ui/text/models/types'

export const chipIconLeftSizes: Record<TAltCoreChipSize, string> = {
  [EAltSizes.SMALL]: '16px',
  [EAltSizes.LARGE]: '24px',
}

export const chipLabelTextSizes: Record<TAltCoreChipSize, string> = {
  [EAltSizes.SMALL]: EAltCoreTextSize.A2_REGULAR,
  [EAltSizes.LARGE]: EAltCoreTextSize.P1_REGULAR,
}

export const chipIconLeftValue: IAltIcon = { name: 'check' as TAltIcons, data: '' } as IAltIcon

export const propLabelTestCases: TPropTestCase<IAltCoreChipProps, 'labelText'>[] = [
  empty,
  text,
].map((value) => ({ prop: 'labelText', case: value, value }))

export const propIconLeftTestCases: TPropTestCase<IAltCoreChipProps, 'iconLeft'>[] = [
  {
    prop: 'iconLeft',
    case: 'with a value',
    value: chipIconLeftValue,
  },
]

export const propSizeTestCases: TPropTestCase<IAltCoreChipProps, 'size'>[] = [
  EAltSizes.SMALL as TAltCoreChipSize,
  EAltSizes.LARGE as TAltCoreChipSize,
].map((value) => ({ prop: 'size', case: `with value ${value}`, value }))

export const propActiveTestCases: TPropTestCase<IAltCoreChipProps, 'active'>[] = [{ prop: 'active', case: 'with value true', value: true }]

export const propDisabledTestCases: TPropTestCase<IAltCoreChipProps, 'disabled'>[] = [{ prop: 'disabled', case: 'with value true', value: true }]
