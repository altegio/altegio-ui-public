import type { TSlotTestCase } from '~shared/types/tests.ts'
import { empty, text } from '~shared/tests/slotContents.ts'

export const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'before', case: 'with content', content: text },
  { slot: 'before', case: 'without content', content: empty },
  { slot: 'after', case: 'with content', content: text },
  { slot: 'after', case: 'without content', content: empty },
]
