import type { TPropTestCase } from '~shared/types/tests'
import {
  createNgDropdownListProps,
  type IYNgDropdownListProps,
} from '~ng/ui/dropdownList/models/types'
import {
  propItemsTestCases as corePropItemsTestCases,
  propItemLabelTestCases as corePropItemLabelTestCases,
  propMinWidthTestCases as corePropMinWidthTestCases,
} from '~core/ui/dropdownList/tests/cases/props'


const { items: defaultItems, itemLabel: defaultItemLabel, minWidth: defaultMinWidth } = createNgDropdownListProps()

export const propItemsTestCases: TPropTestCase<IYNgDropdownListProps, 'items'>[] = [
  ...corePropItemsTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'items',
    case: 'without items',
    value: undefined,
    expected: defaultItems,
  },
]
export const propItemLabelTestCases: TPropTestCase<IYNgDropdownListProps, 'itemLabel'>[] = [
  ...corePropItemLabelTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'itemLabel',
    case: 'without itemLabel',
    value: undefined,
    expected: defaultItemLabel,
  },
]
export const propMinWidthTestCases: TPropTestCase<IYNgDropdownListProps, 'minWidth'>[] = [
  ...corePropMinWidthTestCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  {
    prop: 'minWidth',
    case: 'without minWidth',
    value: undefined,
    expected: defaultMinWidth,
  },
]
