import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotAnnotationTestCases: TSlotTestCase[] = [
  { slot: 'annotation', case: 'с контентом', content: text },
  { slot: 'annotation', case: 'без контента', content: empty },
]
