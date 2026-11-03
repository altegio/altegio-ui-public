import { text, empty } from '~shared/tests/slotContents'
import type { TSlotTestCase } from '~shared/types/tests'

export const slotActivatorTestCases: TSlotTestCase[] = [
  { slot: 'activator', case: 'with content', content: text },
  { slot: 'activator', case: 'without content', content: empty },
]
export const slotContentTestCases: TSlotTestCase[] = [
  { slot: 'content', case: 'with content', content: text },
  { slot: 'content', case: 'without content', content: empty },
]
