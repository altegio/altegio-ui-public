import type { TPropTestCase } from '~shared/types/tests'
import type { IYVueTooltipProps } from '~vue/ui/tooltip/models/types'
import { empty, text } from '~shared/tests/slotContents'
import { propPlacementTestCases as corePropPlacementTestCases } from '~core/ui/tip/tests/cases/props'
import { createCoreTooltipProps } from '~core/ui/tooltip/models/types'

const { placement } = createCoreTooltipProps()

export const propTextTestCases: TPropTestCase<IYVueTooltipProps, 'text'>[] = [
  {
    prop: 'text',
    case: 'со значением',
    value: text,
    expected: text,
  },
  {
    prop: 'text',
    case: 'с пустым значением',
    value: empty,
    expected: empty,
  },
  {
    prop: 'text',
    case: 'без значения',
    value: undefined,
    expected: '',
  },
]

export const propDisabledTestCases: TPropTestCase<IYVueTooltipProps, 'disabled'>[] = [
  {
    prop: 'disabled',
    case: 'со истинным значением',
    value: true,
    expected: true,
    additionalProps: { text: 'text' },
  },
  {
    prop: 'disabled',
    case: 'с ложным значением',
    value: false,
    expected: false,
    additionalProps: { text: 'text' },
  },
  {
    prop: 'disabled',
    case: 'без значения',
    value: undefined,
    expected: false,
    additionalProps: { text: 'text' },
  },
]

export const propPlacementTestCases: TPropTestCase<IYVueTooltipProps, 'placement'>[] = [
  ...corePropPlacementTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'placement',
    case: 'без значения',
    value: undefined,
    expected: placement,
  },
]
