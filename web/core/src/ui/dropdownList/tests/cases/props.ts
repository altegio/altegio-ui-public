import type { TPropTestCase } from '~shared/types/tests'
import {
  type IAltCoreDropdownListProps,
} from '~core/ui/dropdownList/models/types'

export const propItemsTestCases: TPropTestCase<IAltCoreDropdownListProps, 'items'>[] = [
  {
    prop: 'items',
    case: 'with many items',
    value: [
      { id: '1', label: 'multiple-1' },
      { id: '2', label: 'multiple-2' },
      { id: '3', label: 'multiple-3' },
    ],
  },
  {
    prop: 'items',
    case: 'with one item',
    value: [{ id: '1', label: 'one-1' }],
  },
  {
    prop: 'items',
    case: 'without items',
    value: [],
  },
]
export const propItemLabelTestCases: TPropTestCase<IAltCoreDropdownListProps, 'itemLabel'>[] = [
  {
    prop: 'itemLabel',
    case: 'with an existing property',
    value: 'label',
    expected: true,
  },
  {
    prop: 'itemLabel',
    case: 'with a missing property',
    value: 'unknown',
    expected: false,
  },
]

export const propMinWidthTestCases: TPropTestCase<IAltCoreDropdownListProps, 'minWidth'>[] = [
  {
    prop: 'minWidth',
    case: 'with the minimum width',
    value: '88px',
  },
  {
    prop: 'minWidth',
    case: 'with a custom width',
    value: '250px',
  },
]
