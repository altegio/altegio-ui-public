import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotBeforeTestCases: TSlotTestCase[] = [
  { slot: 'cardSelectBefore', case: 'with content', content: text },
  { slot: 'cardSelectBefore', case: 'without content', content: empty },
]
export const slotAnnotationTestCases: TSlotTestCase[] = [
  { slot: 'cardSelectAnnotation', case: 'with content', content: text },
  { slot: 'cardSelectAnnotation', case: 'without content', content: empty },
]
export const slotAfterTestCases: TSlotTestCase[] = [
  { slot: 'cardSelectAfter', case: 'with content', content: text },
  { slot: 'cardSelectAfter', case: 'without content', content: empty },
]
