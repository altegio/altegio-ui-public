import { text, empty } from '~shared/tests/slotContents'
import type { TSlotTestCase } from '~shared/types/tests'


export const slotLabelTestCases: TSlotTestCase[] = [
  { slot: 'label', case: 'with content', content: text },
  { slot: 'label', case: 'without content', content: empty },
]

export const slotAnnotationTestCases: TSlotTestCase[] = [
  { slot: 'annotation', case: 'with content', content: text },
  { slot: 'annotation', case: 'without content', content: empty },
]
