import { text, empty } from '~shared/tests/slotContents'
import type { TSlotTestCase } from '~shared/types/tests'


export const slotLabelTestCases: TSlotTestCase[] = [
  { slot: 'label', case: 'с контентом', content: text },
  { slot: 'label', case: 'без контента', content: empty },
]

export const slotAnnotationTestCases: TSlotTestCase[] = [
  { slot: 'annotation', case: 'с контентом', content: text },
  { slot: 'annotation', case: 'без контента', content: empty },
]
