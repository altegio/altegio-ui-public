import { type TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotListTestCases: TSlotTestCase<'list'>[] = [
  { slot: 'list', case: 'with content', content: text },
  { slot: 'list', case: 'without content', content: empty },
]

export const slotAnnotationTestCases: TSlotTestCase<'annotation'>[] = [
  { slot: 'annotation', case: 'with content', content: text },
  { slot: 'annotation', case: 'without content', content: empty },
]
