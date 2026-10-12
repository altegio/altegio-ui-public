import type { TPropTestCase } from '~shared/types/tests'
import {
  type IYCoreDropdownListProps,
} from '~core/ui/dropdownList/models/types'

export const propItemsTestCases: TPropTestCase<IYCoreDropdownListProps, 'items'>[] = [
  {
    prop: 'items',
    case: 'с множеством элементов',
    value: [
      { id: '1', label: 'multiple-1' },
      { id: '2', label: 'multiple-2' },
      { id: '3', label: 'multiple-3' },
    ],
  },
  {
    prop: 'items',
    case: 'с одним элементом',
    value: [{ id: '1', label: 'one-1' }],
  },
  {
    prop: 'items',
    case: 'без элементов',
    value: [],
  },
]
export const propItemLabelTestCases: TPropTestCase<IYCoreDropdownListProps, 'itemLabel'>[] = [
  {
    prop: 'itemLabel',
    case: 'с существующим свойством',
    value: 'label',
    expected: true,
  },
  {
    prop: 'itemLabel',
    case: 'с несуществующим свойством',
    value: 'unknown',
    expected: false,
  },
]

export const propMinWidthTestCases: TPropTestCase<IYCoreDropdownListProps, 'minWidth'>[] = [
  {
    prop: 'minWidth',
    case: 'с минимальной шириной',
    value: '88px',
  },
  {
    prop: 'minWidth',
    case: 'с произвольной шириной',
    value: '250px',
  },
]
