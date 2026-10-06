import { textWithTag } from '~shared/tests/slotContents'
import type { TSlotTestCase } from '~shared/types/tests'

export const textFieldSlotsTestCases: TSlotTestCase[] = [
  { slot: 'before', case: 'с контентом', content: textWithTag },
  { slot: 'after', case: 'с контентом', content: textWithTag },
]
