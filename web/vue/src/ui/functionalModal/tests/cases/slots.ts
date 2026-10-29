import { text, empty } from '~shared/tests/slotContents'
import type { TSlotTestCase } from '~shared/types/tests'

export const slotsTestCases: TSlotTestCase[] = [
  { slot: 'header', case: 'with content', content: text },
  { slot: 'header', case: 'without content', content: empty },
  { slot: 'content', case: 'with content', content: text },
  { slot: 'content', case: 'without content', content: empty },
  { slot: 'footer', case: 'with content', content: text },
  { slot: 'footer', case: 'without content', content: empty },
  { slot: 'before-actions', case: 'with content', content: text },
  { slot: 'before-actions', case: 'without content', content: empty },
  { slot: 'actions', case: 'with content', content: text },
  { slot: 'actions', case: 'without content', content: empty },
  { slot: 'activator', case: 'with content', content: text },
  { slot: 'activator', case: 'without content', content: empty },
  { slot: 'header-media', case: 'with content', content: text },
  { slot: 'header-media', case: 'without content', content: empty },
]
