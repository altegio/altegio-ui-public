import type { TPropTestCase } from '~shared/types/tests'
import {
  type IAltCorePopoverProps,
} from '~core/ui/popover/models/types'
import {
  propIsOpenTestCases as corePropIsOpenTestCases,
  propOffsetTestCases as corePropOffsetTestCases,
  propPaddingTestCases as corePropPaddingTestCases,
  propPlacementTestCases as corePropPlacementTestCases,
  propStrategyTestCases as corePropStrategyTestCases,
  propTransitionTestCases as corePropTransitionTestCases,
  propTriggerTestCases as corePropTriggerTestCases,
  propTypeTestCases as corePropTypeTestCases,
} from '~core/ui/popover/tests/cases/props'
import {
  createCorePopoverProps,
} from '~core/ui/popover/models/types'

const {
  isOpen: defaultIsOpen,
  offset: defaultOffset,
  padding: defaultPadding,
  placement: defaultPlacement,
  strategy: defaultStrategy,
  transition: defaultTransition,
  trigger: defaultTrigger,
  type: defaultType,
  submitText: defaultSubmitText,
  cancelText: defaultCancelText,
} = createCorePopoverProps()

export const propIsOpenTestCases: TPropTestCase<IAltCorePopoverProps, 'isOpen'>[] = [
  ...corePropIsOpenTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'isOpen',
    case: 'without a value',
    value: undefined,
    expected: defaultIsOpen,
  },
]
export const propOffsetTestCases: TPropTestCase<IAltCorePopoverProps, 'offset'>[] = [
  ...corePropOffsetTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'offset',
    case: 'without a value',
    value: undefined,
    expected: defaultOffset,
  },
]
export const propPaddingTestCases: TPropTestCase<IAltCorePopoverProps, 'padding'>[] = [
  ...corePropPaddingTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'padding',
    case: 'without a value',
    value: undefined,
    expected: defaultPadding,
  },
]
export const propPlacementTestCases: TPropTestCase<IAltCorePopoverProps, 'placement'>[] = [
  ...corePropPlacementTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'placement',
    case: 'without a value',
    value: undefined,
    expected: defaultPlacement,
  },
]
export const propStrategyTestCases: TPropTestCase<IAltCorePopoverProps, 'strategy'>[] = [
  ...corePropStrategyTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'strategy',
    case: 'without a value',
    value: undefined,
    expected: defaultStrategy,
  },
]
export const propTransitionTestCases: TPropTestCase<IAltCorePopoverProps, 'transition'>[] = [
  ...corePropTransitionTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'transition',
    case: 'without a value',
    value: undefined,
    expected: defaultTransition,
  },
]
export const propTriggerTestCases: TPropTestCase<IAltCorePopoverProps, 'trigger'>[] = [
  ...corePropTriggerTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'trigger',
    case: 'without a value',
    value: undefined,
    expected: defaultTrigger,
  },
]
export const propTypeTestCases: TPropTestCase<IAltCorePopoverProps, 'type'>[] = [
  ...corePropTypeTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'type',
    case: 'without a value',
    value: undefined,
    expected: defaultType,
  },
]

export const propSubmitTextTestCases: TPropTestCase<IAltCorePopoverProps, 'submitText'>[] = [
  {
    prop: 'submitText',
    case: 'without a value',
    value: undefined,
    expected: defaultSubmitText,
  },
]

export const propCancelTextTestCases: TPropTestCase<IAltCorePopoverProps, 'cancelText'>[] = [
  {
    prop: 'cancelText',
    case: 'without a value',
    value: undefined,
    expected: defaultCancelText,
  },
]
