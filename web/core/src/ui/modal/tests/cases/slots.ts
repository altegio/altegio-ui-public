import type { TSlotTestCase } from '~shared/types/tests'
import { empty, text } from '~shared/tests/slotContents'

export const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'before', case: 'with content', content: text },
  { slot: 'before', case: 'without content', content: empty },
  { slot: 'content', case: 'with content', content: text },
  { slot: 'content', case: 'without content', content: empty },
  { slot: 'activator', case: 'with content', content: text },
  { slot: 'activator', case: 'without content', content: empty },
  { slot: 'close', case: 'with content', content: text },
  { slot: 'close', case: 'without content', content: empty },
  { slot: 'close-icon', case: 'with content', content: text },
  { slot: 'close-icon', case: 'without content', content: empty },
]
