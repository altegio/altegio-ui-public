import { type TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotBeforeTestCases: TSlotTestCase<'before'>[] = [
  { slot: 'before', case: 'with content', content: text },
  { slot: 'before', case: 'without content', content: empty },
]

export const slotTooltipContentTestCases: TSlotTestCase<'tooltip-content'>[] = [
  { slot: 'tooltip-content', case: 'with content', content: text },
  { slot: 'tooltip-content', case: 'without content', content: empty },
]

export const slotAnnotationTestCases: TSlotTestCase<'annotation'>[] = [
  { slot: 'annotation', case: 'with content', content: text },
  { slot: 'annotation', case: 'without content', content: empty },
]

export const slotAfterTestCases: TSlotTestCase<'after'>[] = [
  { slot: 'after', case: 'with content', content: text },
  { slot: 'after', case: 'without content', content: empty },
]
