import type { TPropTestCase } from '~shared/types/tests'
import type { IYVueTooltipProps } from '~vue/ui/tooltip/models/types'
import { empty, text } from '~shared/tests/slotContents'
import { propPlacementTestCases as corePropPlacementTestCases } from '~core/ui/tip/tests/cases/props'
import { createCoreTooltipProps } from '~core/ui/tooltip/models/types'

const { placement } = createCoreTooltipProps()

export const propTextTestCases: TPropTestCase<IYVueTooltipProps, 'text'>[] = [
  {
    prop: 'text',
    case: 'with a value',
    value: text,
    expected: text,
  },
  {
    prop: 'text',
    case: 'with an empty value',
    value: empty,
    expected: empty,
  },
  {
    prop: 'text',
    case: 'without a value',
    value: undefined,
    expected: '',
  },
]

export const propDisabledTestCases: TPropTestCase<IYVueTooltipProps, 'disabled'>[] = [
  {
    prop: 'disabled',
    case: 'with a true value',
    value: true,
    expected: true,
    additionalProps: { text: 'text' },
  },
  {
    prop: 'disabled',
    case: 'with a false value',
    value: false,
    expected: false,
    additionalProps: { text: 'text' },
  },
  {
    prop: 'disabled',
    case: 'without a value',
    value: undefined,
    expected: false,
    additionalProps: { text: 'text' },
  },
]

export const propPlacementTestCases: TPropTestCase<IYVueTooltipProps, 'placement'>[] = [
  ...corePropPlacementTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'placement',
    case: 'without a value',
    value: undefined,
    expected: placement,
  },
]
