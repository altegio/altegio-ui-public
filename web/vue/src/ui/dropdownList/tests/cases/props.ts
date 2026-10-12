import type { TPropTestCase } from '~shared/types/tests'
import {
  type IYVueDropdownListProps,
} from '~vue/ui/dropdownList/models/types'
import {
  propItemsTestCases as corePropItemsTestCases,
  propItemLabelTestCases as corePropItemLabelTestCases,
  propMinWidthTestCases as corePropMinWidthTestCases,
} from '~core/ui/dropdownList/tests/cases/props'
import {
  createCoreDropdownListProps,
} from '~core/ui/dropdownList/models/types'

const { items: defaultItems, minWidth: defaultMinWidth } = createCoreDropdownListProps()

export const propItemsTestCases: TPropTestCase<IYVueDropdownListProps, 'items'>[] = [
  ...corePropItemsTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'items',
    case: 'без элементов',
    value: undefined,
    expected: defaultItems,
  },
]
export const propItemLabelTestCases: TPropTestCase<IYVueDropdownListProps, 'itemLabel'>[] = [
  ...corePropItemLabelTestCases,
  {
    prop: 'itemLabel',
    case: 'без itemLabel',
    value: undefined,
    expected: true,
  },
]
export const propMinWidthTestCases: TPropTestCase<IYVueDropdownListProps, 'minWidth'>[] = [
  ...corePropMinWidthTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'minWidth',
    case: 'без minWidth',
    value: undefined,
    expected: defaultMinWidth,
  },
]
