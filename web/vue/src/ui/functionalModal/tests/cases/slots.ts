import { text, empty } from '~shared/tests/slotContents'
import type { TSlotTestCase } from '~shared/types/tests'

export const slotsTestCases: TSlotTestCase[] = [
  { slot: 'header', case: 'с контентом', content: text },
  { slot: 'header', case: 'без контента', content: empty },
  { slot: 'content', case: 'с контентом', content: text },
  { slot: 'content', case: 'без контента', content: empty },
  { slot: 'footer', case: 'с контентом', content: text },
  { slot: 'footer', case: 'без контента', content: empty },
  { slot: 'before-actions', case: 'с контентом', content: text },
  { slot: 'before-actions', case: 'без контента', content: empty },
  { slot: 'actions', case: 'с контентом', content: text },
  { slot: 'actions', case: 'без контента', content: empty },
  { slot: 'activator', case: 'с контентом', content: text },
  { slot: 'activator', case: 'без контента', content: empty },
  { slot: 'header-media', case: 'с контентом', content: text },
  { slot: 'header-media', case: 'без контента', content: empty },
]
