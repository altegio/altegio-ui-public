import { textWithTag } from '~shared/tests/slotContents'
import type { TSlotTestCase } from '~shared/types/tests'

export const textFieldSlotsTestCases: TSlotTestCase[] = [
  { slot: 'before', case: 'with content', content: textWithTag },
  { slot: 'after', case: 'with content', content: textWithTag },
]
