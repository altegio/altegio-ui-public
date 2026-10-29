import { type TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotAnnotationTestCases: TSlotTestCase<'annotation'>[] = [
  { slot: 'annotation', case: 'with content', content: text },
  { slot: 'annotation', case: 'without content', content: empty },
]

export const slotDropdownListTopTestCases: TSlotTestCase<'dropdown-list-top'>[] = [
  { slot: 'dropdown-list-top', case: 'with content', content: text },
  { slot: 'dropdown-list-top', case: 'without content', content: empty },
]

export const slotDropdownListBottomTestCases: TSlotTestCase<'dropdown-list-bottom'>[] = [
  { slot: 'dropdown-list-bottom', case: 'with content', content: text },
  { slot: 'dropdown-list-bottom', case: 'without content', content: empty },
]
