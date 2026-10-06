import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotBeforeTestCases: TSlotTestCase[] = [
  { slot: 'cardButtonBefore', case: 'с контентом', content: text },
  { slot: 'cardButtonBefore', case: 'без контента', content: empty },
]
export const slotMainTestCases: TSlotTestCase[] = [
  { slot: 'cardButtonMain', case: 'с контентом', content: text },
  { slot: 'cardButtonMain', case: 'без контента', content: empty },
]
export const slotAnnotationTestCases: TSlotTestCase[] = [
  { slot: 'cardButtonAnnotation', case: 'с контентом', content: text },
  { slot: 'cardButtonAnnotation', case: 'без контента', content: empty },
]
export const slotAfterTestCases: TSlotTestCase[] = [
  { slot: 'cardButtonAfter', case: 'с контентом', content: text },
  { slot: 'cardButtonAfter', case: 'без контента', content: empty },
]
