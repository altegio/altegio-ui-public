import type { TPropTestCase } from '~shared/types/tests'
import {
  type IYCorePopoverProps,
} from '~core/ui/popover/models/types'
import { EYCoreTipType } from '~core/ui/tip/models/types'
import { EYCoreDropdownTrigger, EYCoreDropdownPlacement, EYCoreDropdownStrategy } from '~core/ui/dropdown/models/types'

export const propTypeTestCases: TPropTestCase<IYCorePopoverProps, 'type'>[] = Object
  .values(EYCoreTipType)
  .map((type) => ({
    prop: 'type',
    case: type,
    value: type,
  }))

export const propPaddingTestCases: TPropTestCase<IYCorePopoverProps, 'padding'>[] = [
  {
    prop: 'padding',
    case: 'со значением',
    value: 8,
  },
]

export const propOffsetTestCases: TPropTestCase<IYCorePopoverProps, 'offset'>[] = [
  {
    prop: 'offset',
    case: 'со значением',
    value: 8,
  },
]

export const propTriggerTestCases: TPropTestCase<IYCorePopoverProps, 'trigger'>[] = Object.values(EYCoreDropdownTrigger).map((value) => ({ prop: 'trigger', case: `со значением ${value}`, value }))

export const propIsOpenTestCases: TPropTestCase<IYCorePopoverProps, 'isOpen'>[] = [
  true,
  false,
].map((value) => ({ prop: 'isOpen', case: `со значением ${value}`, value }))

export const propPlacementTestCases: TPropTestCase<IYCorePopoverProps, 'placement'>[] = Object.values(EYCoreDropdownPlacement).map((value) => ({ prop: 'placement', case: `со значением ${value}`, value }))

export const propStrategyTestCases: TPropTestCase<IYCorePopoverProps, 'strategy'>[] = Object.values(EYCoreDropdownStrategy).map((value) => ({ prop: 'strategy', case: `со значением ${value}`, value }))

export const propTransitionTestCases: TPropTestCase<IYCorePopoverProps, 'transition'>[] = [
  {
    prop: 'transition',
    case: 'со значением',
    value: 'none',
  },
]

export const propSubmitTextTestCases: TPropTestCase<IYCorePopoverProps, 'submitText'> = {
  prop: 'submitText',
  case: 'со значением',
  value: 'Далее',
}

export const propCancelTextTestCases: TPropTestCase<IYCorePopoverProps, 'cancelText'> = {
  prop: 'cancelText',
  case: 'со значением',
  value: 'Далее',
}
