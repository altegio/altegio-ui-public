import { type TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

export const slotBeforeTestCases: TSlotTestCase<'before'>[] = [
  { slot: 'before', case: 'с контентом', content: text },
  { slot: 'before', case: 'без контента', content: empty },
]

export const slotTooltipContentTestCases: TSlotTestCase<'tooltip-content'>[] = [
  { slot: 'tooltip-content', case: 'с контентом', content: text },
  { slot: 'tooltip-content', case: 'без контента', content: empty },
]

export const slotAnnotationTestCases: TSlotTestCase<'annotation'>[] = [
  { slot: 'annotation', case: 'с контентом', content: text },
  { slot: 'annotation', case: 'без контента', content: empty },
]

export const slotAfterTestCases: TSlotTestCase<'after'>[] = [
  { slot: 'after', case: 'с контентом', content: text },
  { slot: 'after', case: 'без контента', content: empty },
]
