import type { TPropTestCase } from '~shared/types/tests'
import {
  type IYVuePopoverProps,
} from '~vue/ui/popover/models/types'
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
  cancelText: defaltCancelText,
} = createCorePopoverProps()

export const propIsOpenTestCases: TPropTestCase<IYVuePopoverProps, 'isOpen'>[] = [
  ...corePropIsOpenTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'isOpen',
    case: 'без значения',
    value: undefined,
    expected: defaultIsOpen,
  },
]
export const propOffsetTestCases: TPropTestCase<IYVuePopoverProps, 'offset'>[] = [
  ...corePropOffsetTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'offset',
    case: 'без значения',
    value: undefined,
    expected: defaultOffset,
  },
]
export const propPaddingTestCases: TPropTestCase<IYVuePopoverProps, 'padding'>[] = [
  ...corePropPaddingTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'padding',
    case: 'без значения',
    value: undefined,
    expected: defaultPadding,
  },
]
export const propPlacementTestCases: TPropTestCase<IYVuePopoverProps, 'placement'>[] = [
  ...corePropPlacementTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'placement',
    case: 'без значения',
    value: undefined,
    expected: defaultPlacement,
  },
]
export const propStrategyTestCases: TPropTestCase<IYVuePopoverProps, 'strategy'>[] = [
  ...corePropStrategyTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'strategy',
    case: 'без значения',
    value: undefined,
    expected: defaultStrategy,
  },
]
export const propTransitionTestCases: TPropTestCase<IYVuePopoverProps, 'transition'>[] = [
  ...corePropTransitionTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'transition',
    case: 'без значения',
    value: undefined,
    expected: defaultTransition,
  },
]
export const propTriggerTestCases: TPropTestCase<IYVuePopoverProps, 'trigger'>[] = [
  ...corePropTriggerTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'trigger',
    case: 'без значения',
    value: undefined,
    expected: defaultTrigger,
  },
]
export const propTypeTestCases: TPropTestCase<IYVuePopoverProps, 'type'>[] = [
  ...corePropTypeTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'type',
    case: 'без значения',
    value: undefined,
    expected: defaultType,
  },
]

export const propSubmitTextTestCases: TPropTestCase<IYVuePopoverProps, 'submitText'>[] = [
  {
    prop: 'submitText',
    case: 'без значения',
    value: undefined,
    expected: defaultSubmitText,
  },
]

export const propCancelTextTestCases: TPropTestCase<IYVuePopoverProps, 'cancelText'>[] = [
  {
    prop: 'cancelText',
    case: 'без значения',
    value: undefined,
    expected: defaltCancelText,
  },
]
