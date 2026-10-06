import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotBeforeTestCases: TSlotTestCase[] = [
  { slot: 'before', case: 'с контентом', content: text },
  { slot: 'before', case: 'без контента', content: empty },
]

export const slotMainTestCases: TSlotTestCase[] = [
  { slot: 'main', case: 'с контентом', content: text },
  { slot: 'main', case: 'без контента', content: empty },
]

export const slotLabelTestCases: TSlotTestCase[] = [
  { slot: 'label', case: 'с контентом', content: text },
  { slot: 'label', case: 'без контента', content: empty },
]

export const slotAnnotationTestCases: TSlotTestCase[] = [
  { slot: 'annotation', case: 'с контентом', content: text },
  { slot: 'annotation', case: 'без контента', content: empty },
]

export const slotAfterTestCases: TSlotTestCase[] = [
  { slot: 'after', case: 'с контентом', content: text },
  { slot: 'after', case: 'без контента', content: empty },
]

export const slotContentTestCases: TSlotTestCase[] = [
  { slot: 'content', case: 'с контентом', content: text },
  { slot: 'content', case: 'без контента', content: empty },
]
