import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotTopTestCases: TSlotTestCase[] = [
  { slot: 'top', case: 'с контентом', content: text },
  { slot: 'top', case: 'без контента', content: empty },
]
export const slotListTestCases: TSlotTestCase[] = [
  { slot: 'list', case: 'с контентом', content: text },
  { slot: 'list', case: 'без контента', content: empty },
]
export const slotBottomTestCases: TSlotTestCase[] = [
  { slot: 'bottom', case: 'с контентом', content: text },
  { slot: 'bottom', case: 'без контента', content: empty },
]
