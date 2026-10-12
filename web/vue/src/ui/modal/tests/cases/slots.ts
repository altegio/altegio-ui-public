import type { TSlotTestCase } from '~shared/types/tests'
import { empty, text } from '~shared/tests/slotContents'

export const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'content', case: 'с контентом', content: text },
  { slot: 'content', case: 'без контента', content: empty },
  { slot: 'activator', case: 'с контентом', content: text },
  { slot: 'activator', case: 'без контента', content: empty },
  { slot: 'close', case: 'с контентом', content: text },
  { slot: 'close', case: 'без контента', content: empty },
]
