import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export * from '~core/ui/dropdownList/tests/cases/slots'
export const slotItemOuterTestCases: TSlotTestCase[] = [
  {
    slot: 'item-outer',
    case: 'с контентом для шаблона элемента без y-core-dropdown-cell',
    content: text,
  },
  {
    slot: 'item-outer',
    case: 'без контента для шаблона элемента без y-core-dropdown-cell',
    content: empty,
  },
]
export const slotItemInnerTestCases: TSlotTestCase[] = [
  {
    slot: 'item-inner',
    case: 'с контентом для шаблона элемента внутри y-core-dropdown-cell',
    content: text,
  },
  {
    slot: 'item-inner',
    case: 'без контента для шаблона элемента внутри y-core-dropdown-cell',
    content: empty,
  },
]
export const slotItem2OuterTestCases: TSlotTestCase[] = [
  {
    slot: 'item-outer-2',
    case: 'с контентом для шаблона второго элемента без y-core-dropdown-cell',
    content: text,
  },
  {
    slot: 'item-outer-2',
    case: 'без контента для шаблона второго элемента без y-core-dropdown-cell',
    content: empty,
  },
]
export const slotItem2InnerTestCases: TSlotTestCase[] = [
  {
    slot: 'item-inner-2',
    case: 'с контентом для шаблона второго элемента внутри y-core-dropdown-cell',
    content: text,
  },
  {
    slot: 'item-inner-2',
    case: 'без контента для шаблона второго элемента внутри y-core-dropdown-cell',
    content: empty,
  },
]

