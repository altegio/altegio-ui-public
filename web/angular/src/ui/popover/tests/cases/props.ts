import type { TPropTestCase } from '~shared/types/tests'
import {
  type IYCorePopoverProps,
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

export const propIsOpenTestCases: TPropTestCase<IYCorePopoverProps, 'isOpen'>[] = [
  ...corePropIsOpenTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'isOpen',
    case: 'без значения',
    value: undefined,
    expected: defaultIsOpen,
  },
]
export const propOffsetTestCases: TPropTestCase<IYCorePopoverProps, 'offset'>[] = [
  ...corePropOffsetTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'offset',
    case: 'без значения',
    value: undefined,
    expected: defaultOffset,
  },
]
export const propPaddingTestCases: TPropTestCase<IYCorePopoverProps, 'padding'>[] = [
  ...corePropPaddingTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'padding',
    case: 'без значения',
    value: undefined,
    expected: defaultPadding,
  },
]
export const propPlacementTestCases: TPropTestCase<IYCorePopoverProps, 'placement'>[] = [
  ...corePropPlacementTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'placement',
    case: 'без значения',
    value: undefined,
    expected: defaultPlacement,
  },
]
export const propStrategyTestCases: TPropTestCase<IYCorePopoverProps, 'strategy'>[] = [
  ...corePropStrategyTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'strategy',
    case: 'без значения',
    value: undefined,
    expected: defaultStrategy,
  },
]
export const propTransitionTestCases: TPropTestCase<IYCorePopoverProps, 'transition'>[] = [
  ...corePropTransitionTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'transition',
    case: 'без значения',
    value: undefined,
    expected: defaultTransition,
  },
]
export const propTriggerTestCases: TPropTestCase<IYCorePopoverProps, 'trigger'>[] = [
  ...corePropTriggerTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'trigger',
    case: 'без значения',
    value: undefined,
    expected: defaultTrigger,
  },
]
export const propTypeTestCases: TPropTestCase<IYCorePopoverProps, 'type'>[] = [
  ...corePropTypeTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'type',
    case: 'без значения',
    value: undefined,
    expected: defaultType,
  },
]

export const propSubmitTextTestCases: TPropTestCase<IYCorePopoverProps, 'submitText'>[] = [
  {
    prop: 'submitText',
    case: 'без значения',
    value: undefined,
    expected: defaultSubmitText,
  },
]

export const propCancelTextTestCases: TPropTestCase<IYCorePopoverProps, 'cancelText'>[] = [
  {
    prop: 'cancelText',
    case: 'без значения',
    value: undefined,
    expected: defaultCancelText,
  },
]
