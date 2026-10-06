import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotBeforeTestCases: TSlotTestCase[] = [
  { slot: 'cardSelectBefore', case: 'с контентом', content: text },
  { slot: 'cardSelectBefore', case: 'без контента', content: empty },
]
export const slotAnnotationTestCases: TSlotTestCase[] = [
  { slot: 'cardSelectAnnotation', case: 'с контентом', content: text },
  { slot: 'cardSelectAnnotation', case: 'без контента', content: empty },
]
export const slotAfterTestCases: TSlotTestCase[] = [
  { slot: 'cardSelectAfter', case: 'с контентом', content: text },
  { slot: 'cardSelectAfter', case: 'без контента', content: empty },
]
