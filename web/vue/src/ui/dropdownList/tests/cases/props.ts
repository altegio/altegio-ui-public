import type { TPropTestCase } from '~shared/types/tests'
import {
  type IAltVueDropdownListProps,
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

export const propItemsTestCases: TPropTestCase<IAltVueDropdownListProps, 'items'>[] = [
  ...corePropItemsTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'items',
    case: 'without items',
    value: undefined,
    expected: defaultItems,
  },
]
export const propItemLabelTestCases: TPropTestCase<IAltVueDropdownListProps, 'itemLabel'>[] = [
  ...corePropItemLabelTestCases,
  {
    prop: 'itemLabel',
    case: 'without itemLabel',
    value: undefined,
    expected: true,
  },
]
export const propMinWidthTestCases: TPropTestCase<IAltVueDropdownListProps, 'minWidth'>[] = [
  ...corePropMinWidthTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'minWidth',
    case: 'without minWidth',
    value: undefined,
    expected: defaultMinWidth,
  },
]
