import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotActivatorTestCases: TSlotTestCase[] = [
  { slot: 'activator', case: 'с контентом', content: text },
  { slot: 'activator', case: 'без контента', content: empty },
]
export const slotContentTestCases: TSlotTestCase[] = [
  { slot: 'content', case: 'с контентом', content: text },
  { slot: 'content', case: 'без контента', content: empty },
]
