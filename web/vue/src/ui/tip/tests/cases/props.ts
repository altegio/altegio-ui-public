import type { TPropTestCase } from '~shared/types/tests'
import {
  type IAltVueTipProps,
} from '~vue/ui/tip/models/types'
import {
  propIsOpenTestCases as corePropIsOpenTestCases,
  propOffsetTestCases as corePropOffsetTestCases,
  propPaddingTestCases as corePropPaddingTestCases,
  propPlacementTestCases as corePropPlacementTestCases,
  propStrategyTestCases as corePropStrategyTestCases,
  propTransitionTestCases as corePropTransitionTestCases,
  propTriggerTestCases as corePropTriggerTestCases,
  propTypeTestCases as corePropTypeTestCases,
} from '~core/ui/tip/tests/cases/props'
import {
  createCoreTipProps,
} from '~core/ui/tip/models/types'

const {
  isOpen: defaultIsOpen,
  offset: defaultOffset,
  padding: defaultPadding,
  placement: defaultPlacement,
  strategy: defaultStrategy,
  transition: defaultTransition,
  trigger: defaultTrigger,
  type: defaultType,
} = createCoreTipProps()

export const propIsOpenTestCases: TPropTestCase<IAltVueTipProps, 'isOpen'>[] = [
  ...corePropIsOpenTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'isOpen',
    case: 'without a value',
    value: undefined,
    expected: defaultIsOpen,
  },
]
export const propOffsetTestCases: TPropTestCase<IAltVueTipProps, 'offset'>[] = [
  ...corePropOffsetTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'offset',
    case: 'without a value',
    value: undefined,
    expected: defaultOffset,
  },
]
export const propPaddingTestCases: TPropTestCase<IAltVueTipProps, 'padding'>[] = [
  ...corePropPaddingTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'padding',
    case: 'without a value',
    value: undefined,
    expected: defaultPadding,
  },
]
export const propPlacementTestCases: TPropTestCase<IAltVueTipProps, 'placement'>[] = [
  ...corePropPlacementTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'placement',
    case: 'without a value',
    value: undefined,
    expected: defaultPlacement,
  },
]
export const propStrategyTestCases: TPropTestCase<IAltVueTipProps, 'strategy'>[] = [
  ...corePropStrategyTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'strategy',
    case: 'without a value',
    value: undefined,
    expected: defaultStrategy,
  },
]
export const propTransitionTestCases: TPropTestCase<IAltVueTipProps, 'transition'>[] = [
  ...corePropTransitionTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'transition',
    case: 'without a value',
    value: undefined,
    expected: defaultTransition,
  },
]
export const propTriggerTestCases: TPropTestCase<IAltVueTipProps, 'trigger'>[] = [
  ...corePropTriggerTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'trigger',
    case: 'without a value',
    value: undefined,
    expected: defaultTrigger,
  },
]
export const propTypeTestCases: TPropTestCase<IAltVueTipProps, 'type'>[] = [
  ...corePropTypeTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'type',
    case: 'without a value',
    value: undefined,
    expected: defaultType,
  },
]
