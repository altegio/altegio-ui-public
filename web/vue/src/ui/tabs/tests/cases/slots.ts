import type { TSlotTestCase } from '~shared/types/tests.ts'
import { empty, text } from '~shared/tests/slotContents.ts'

export const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'default', case: 'с контентом', content: text },
  { slot: 'default', case: 'без контента', content: empty },
]
