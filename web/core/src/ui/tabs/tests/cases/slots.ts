import type { TSlotTestCase } from '~shared/types/tests.ts'
import { empty, text } from '~shared/tests/slotContents.ts'

export const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'default', case: 'with content', content: text },
  { slot: 'default', case: 'without content', content: empty },
]
