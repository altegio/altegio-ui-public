import type { TPropTestCase } from '~shared/types/tests'
import {
  type IAltCorePopoverProps,
} from '~core/ui/popover/models/types'
import { EAltCoreTipType } from '~core/ui/tip/models/types'
import { EAltCoreDropdownTrigger, EAltCoreDropdownPlacement, EAltCoreDropdownStrategy } from '~core/ui/dropdown/models/types'

export const propTypeTestCases: TPropTestCase<IAltCorePopoverProps, 'type'>[] = Object
  .values(EAltCoreTipType)
  .map((type) => ({
    prop: 'type',
    case: type,
    value: type,
  }))

export const propPaddingTestCases: TPropTestCase<IAltCorePopoverProps, 'padding'>[] = [
  {
    prop: 'padding',
    case: 'with a value',
    value: 8,
  },
]

export const propOffsetTestCases: TPropTestCase<IAltCorePopoverProps, 'offset'>[] = [
  {
    prop: 'offset',
    case: 'with a value',
    value: 8,
  },
]

export const propTriggerTestCases: TPropTestCase<IAltCorePopoverProps, 'trigger'>[] = Object.values(EAltCoreDropdownTrigger).map((value) => ({ prop: 'trigger', case: `with value ${value}`, value }))

export const propIsOpenTestCases: TPropTestCase<IAltCorePopoverProps, 'isOpen'>[] = [
  true,
  false,
].map((value) => ({ prop: 'isOpen', case: `with value ${value}`, value }))

export const propPlacementTestCases: TPropTestCase<IAltCorePopoverProps, 'placement'>[] = Object.values(EAltCoreDropdownPlacement).map((value) => ({ prop: 'placement', case: `with value ${value}`, value }))

export const propStrategyTestCases: TPropTestCase<IAltCorePopoverProps, 'strategy'>[] = Object.values(EAltCoreDropdownStrategy).map((value) => ({ prop: 'strategy', case: `with value ${value}`, value }))

export const propTransitionTestCases: TPropTestCase<IAltCorePopoverProps, 'transition'>[] = [
  {
    prop: 'transition',
    case: 'with a value',
    value: 'none',
  },
]

export const propSubmitTextTestCases: TPropTestCase<IAltCorePopoverProps, 'submitText'> = {
  prop: 'submitText',
  case: 'with a value',
  value: 'Next',
}

export const propCancelTextTestCases: TPropTestCase<IAltCorePopoverProps, 'cancelText'> = {
  prop: 'cancelText',
  case: 'with a value',
  value: 'Next',
}
