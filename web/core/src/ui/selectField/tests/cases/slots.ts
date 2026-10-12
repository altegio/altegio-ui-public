import { textWithTag } from '~shared/tests/slotContents'

type TSlotTestCase = {
  slotName: string
  content: string
}

export const dropdownListSlotsTestCases: TSlotTestCase[] = [
  { slotName: 'list', content: textWithTag },
  { slotName: 'dropdown-list-top', content: textWithTag },
  { slotName: 'dropdown-list-bottom', content: textWithTag },
  { slotName: 'before', content: textWithTag },
]
