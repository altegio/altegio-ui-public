import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotBeforeTestCases: TSlotTestCase[] = [
  { slot: 'before', case: 'with content', content: text },
  { slot: 'before', case: 'without content', content: empty },
]

export const slotMainTestCases: TSlotTestCase[] = [
  { slot: 'main', case: 'with content', content: text },
  { slot: 'main', case: 'without content', content: empty },
]

export const slotLabelTestCases: TSlotTestCase[] = [
  { slot: 'label', case: 'with content', content: text },
  { slot: 'label', case: 'without content', content: empty },
]

export const slotAnnotationTestCases: TSlotTestCase[] = [
  { slot: 'annotation', case: 'with content', content: text },
  { slot: 'annotation', case: 'without content', content: empty },
]

export const slotAfterTestCases: TSlotTestCase[] = [
  { slot: 'after', case: 'with content', content: text },
  { slot: 'after', case: 'without content', content: empty },
]

export const slotContentTestCases: TSlotTestCase[] = [
  { slot: 'content', case: 'with content', content: text },
  { slot: 'content', case: 'without content', content: empty },
]
