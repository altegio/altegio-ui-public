import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'before', case: 'с контентом', content: text },
  { slot: 'before', case: 'без контента', content: empty },
  { slot: 'main', case: 'с контентом', content: text },
  { slot: 'main', case: 'без контента', content: empty },
  { slot: 'annotation', case: 'с контентом', content: text },
  { slot: 'annotation', case: 'без контента', content: empty },
  { slot: 'after', case: 'с контентом', content: text },
  { slot: 'after', case: 'без контента', content: empty },
]
