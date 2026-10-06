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
