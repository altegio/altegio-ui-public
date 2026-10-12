import { type TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotListTestCases: TSlotTestCase<'list'>[] = [
  { slot: 'list', case: 'с контентом', content: text },
  { slot: 'list', case: 'без контента', content: empty },
]

export const slotAnnotationTestCases: TSlotTestCase<'annotation'>[] = [
  { slot: 'annotation', case: 'с контентом', content: text },
  { slot: 'annotation', case: 'без контента', content: empty },
]

export const slotDropdownListTopTestCases: TSlotTestCase<'dropdown-list-top'>[] = [
  { slot: 'dropdown-list-top', case: 'с контентом', content: text },
  { slot: 'dropdown-list-top', case: 'без контента', content: empty },
]

export const slotDropdownListBottomTestCases: TSlotTestCase<'dropdown-list-bottom'>[] = [
  { slot: 'dropdown-list-bottom', case: 'с контентом', content: text },
  { slot: 'dropdown-list-bottom', case: 'без контента', content: empty },
]

export const slotBeforeTestCases: TSlotTestCase<'before'>[] = [
  { slot: 'before', case: 'с контентом', content: text },
  { slot: 'before', case: 'без контента', content: empty },
]
