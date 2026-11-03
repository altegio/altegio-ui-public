import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export * from '~core/ui/dropdownList/tests/cases/slots'
export const slotItemOuterTestCases: TSlotTestCase[] = [
  {
    slot: 'item-outer',
    case: 'with content for an item template without alt-core-dropdown-cell',
    content: text,
  },
  {
    slot: 'item-outer',
    case: 'without content for an item template without alt-core-dropdown-cell',
    content: empty,
  },
]
export const slotItemInnerTestCases: TSlotTestCase[] = [
  {
    slot: 'item-inner',
    case: 'with content for an item template inside alt-core-dropdown-cell',
    content: text,
  },
  {
    slot: 'item-inner',
    case: 'without content for an item template inside alt-core-dropdown-cell',
    content: empty,
  },
]
export const slotItem2OuterTestCases: TSlotTestCase[] = [
  {
    slot: 'item-outer-2',
    case: 'with content for the second item template without alt-core-dropdown-cell',
    content: text,
  },
  {
    slot: 'item-outer-2',
    case: 'without content for the second item template without alt-core-dropdown-cell',
    content: empty,
  },
]
export const slotItem2InnerTestCases: TSlotTestCase[] = [
  {
    slot: 'item-inner-2',
    case: 'with content for the second item template inside alt-core-dropdown-cell',
    content: text,
  },
  {
    slot: 'item-inner-2',
    case: 'without content for the second item template inside alt-core-dropdown-cell',
    content: empty,
  },
]

