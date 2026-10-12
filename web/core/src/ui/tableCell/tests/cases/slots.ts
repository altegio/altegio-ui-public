import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotPluginTestCases: TSlotTestCase[] = [
  { slot: 'plugin', case: 'с контентом', content: text },
  { slot: 'plugin', case: 'без контента', content: empty },
]

export const slotCellTestCases: TSlotTestCase[] = [
  { slot: 'cell', case: 'с контентом', content: text },
  { slot: 'cell', case: 'без контента', content: empty },
]
