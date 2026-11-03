import type { TPropTestCase } from '~shared/types/tests'
import {
  type IAltCoreTipProps,
} from '~core/ui/tip/models/types'
import { EAltCoreTipType } from '~core/ui/tip/models/types'
import { EAltCoreDropdownTrigger, EAltCoreDropdownPlacement, EAltCoreDropdownStrategy } from '~core/ui/dropdown/models/types'

export const propTypeTestCases: TPropTestCase<IAltCoreTipProps, 'type'>[] = Object
  .values(EAltCoreTipType)
  .map((type) => ({
    prop: 'type',
    case: type,
    value: type,
  }))

export const propPaddingTestCases: TPropTestCase<IAltCoreTipProps, 'padding'>[] = [
  {
    prop: 'padding',
    case: 'with a value',
    value: 8,
  },
]

export const propOffsetTestCases: TPropTestCase<IAltCoreTipProps, 'offset'>[] = [
  {
    prop: 'offset',
    case: 'with a value',
    value: 8,
  },
]

export const propTriggerTestCases: TPropTestCase<IAltCoreTipProps, 'trigger'>[] = Object.values(EAltCoreDropdownTrigger).map((value) => ({ prop: 'trigger', case: `with value ${value}`, value }))

export const propIsOpenTestCases: TPropTestCase<IAltCoreTipProps, 'isOpen'>[] = [
  true,
  false,
].map((value) => ({ prop: 'isOpen', case: `with value ${value}`, value }))

export const propPlacementTestCases: TPropTestCase<IAltCoreTipProps, 'placement'>[] = Object.values(EAltCoreDropdownPlacement).map((value) => ({ prop: 'placement', case: `with value ${value}`, value }))

export const propStrategyTestCases: TPropTestCase<IAltCoreTipProps, 'strategy'>[] = Object.values(EAltCoreDropdownStrategy).map((value) => ({ prop: 'strategy', case: `with value ${value}`, value }))

export const propTransitionTestCases: TPropTestCase<IAltCoreTipProps, 'transition'>[] = [
  {
    prop: 'transition',
    case: 'with a value',
    value: 'none',
  },
]
