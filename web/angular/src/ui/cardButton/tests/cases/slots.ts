import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotBeforeTestCases: TSlotTestCase[] = [
  { slot: 'cardButtonBefore', case: 'with content', content: text },
  { slot: 'cardButtonBefore', case: 'without content', content: empty },
]
export const slotMainTestCases: TSlotTestCase[] = [
  { slot: 'cardButtonMain', case: 'with content', content: text },
  { slot: 'cardButtonMain', case: 'without content', content: empty },
]
export const slotAnnotationTestCases: TSlotTestCase[] = [
  { slot: 'cardButtonAnnotation', case: 'with content', content: text },
  { slot: 'cardButtonAnnotation', case: 'without content', content: empty },
]
export const slotAfterTestCases: TSlotTestCase[] = [
  { slot: 'cardButtonAfter', case: 'with content', content: text },
  { slot: 'cardButtonAfter', case: 'without content', content: empty },
]
