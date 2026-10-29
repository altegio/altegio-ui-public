import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotTopTestCases: TSlotTestCase[] = [
  { slot: 'top', case: 'with content', content: text },
  { slot: 'top', case: 'without content', content: empty },
]
export const slotListTestCases: TSlotTestCase[] = [
  { slot: 'list', case: 'with content', content: text },
  { slot: 'list', case: 'without content', content: empty },
]
export const slotBottomTestCases: TSlotTestCase[] = [
  { slot: 'bottom', case: 'with content', content: text },
  { slot: 'bottom', case: 'without content', content: empty },
]
