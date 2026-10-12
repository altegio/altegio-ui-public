import type { TPropTestCase } from '~shared/types/tests'
import {
  type IYCoreTipProps,
} from '~core/ui/tip/models/types'
import { EYCoreTipType } from '~core/ui/tip/models/types'
import { EYCoreDropdownTrigger, EYCoreDropdownPlacement, EYCoreDropdownStrategy } from '~core/ui/dropdown/models/types'

export const propTypeTestCases: TPropTestCase<IYCoreTipProps, 'type'>[] = Object
  .values(EYCoreTipType)
  .map((type) => ({
    prop: 'type',
    case: type,
    value: type,
  }))

export const propPaddingTestCases: TPropTestCase<IYCoreTipProps, 'padding'>[] = [
  {
    prop: 'padding',
    case: 'со значением',
    value: 8,
  },
]

export const propOffsetTestCases: TPropTestCase<IYCoreTipProps, 'offset'>[] = [
  {
    prop: 'offset',
    case: 'со значением',
    value: 8,
  },
]

export const propTriggerTestCases: TPropTestCase<IYCoreTipProps, 'trigger'>[] = Object.values(EYCoreDropdownTrigger).map((value) => ({ prop: 'trigger', case: `со значением ${value}`, value }))

export const propIsOpenTestCases: TPropTestCase<IYCoreTipProps, 'isOpen'>[] = [
  true,
  false,
].map((value) => ({ prop: 'isOpen', case: `со значением ${value}`, value }))

export const propPlacementTestCases: TPropTestCase<IYCoreTipProps, 'placement'>[] = Object.values(EYCoreDropdownPlacement).map((value) => ({ prop: 'placement', case: `со значением ${value}`, value }))

export const propStrategyTestCases: TPropTestCase<IYCoreTipProps, 'strategy'>[] = Object.values(EYCoreDropdownStrategy).map((value) => ({ prop: 'strategy', case: `со значением ${value}`, value }))

export const propTransitionTestCases: TPropTestCase<IYCoreTipProps, 'transition'>[] = [
  {
    prop: 'transition',
    case: 'со значением',
    value: 'none',
  },
]
