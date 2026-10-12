import type { TSlotTestCase } from '~shared/types/tests.ts'
import { empty, text } from '~shared/tests/slotContents.ts'

export const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'before', case: 'с контентом', content: text },
  { slot: 'before', case: 'без контента', content: empty },
  { slot: 'after', case: 'с контентом', content: text },
  { slot: 'after', case: 'без контента', content: empty },
]
