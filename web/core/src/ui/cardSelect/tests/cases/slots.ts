import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'before', case: 'with content', content: text },
  { slot: 'before', case: 'without content', content: empty },
  { slot: 'main', case: 'with content', content: text },
  { slot: 'main', case: 'without content', content: empty },
  { slot: 'annotation', case: 'with content', content: text },
  { slot: 'annotation', case: 'without content', content: empty },
  { slot: 'after', case: 'with content', content: text },
  { slot: 'after', case: 'without content', content: empty },
]
