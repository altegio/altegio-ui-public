import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotPluginTestCases: TSlotTestCase[] = [
  { slot: 'plugin', case: 'with content', content: text },
  { slot: 'plugin', case: 'without content', content: empty },
]

export const slotCellTestCases: TSlotTestCase[] = [
  { slot: 'cell', case: 'with content', content: text },
  { slot: 'cell', case: 'without content', content: empty },
]
