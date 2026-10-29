import type { TSlotTestCase } from '~shared/types/tests'
import type { IYCoreTooltipProps } from '~core/ui/tooltip/models/types'
import { empty, text } from '~shared/tests/slotContents'

export const slotContentProvidedTestCases: TSlotTestCase<string, Partial<IYCoreTooltipProps>>[] = [
  { slot: 'content', case: 'with content when the "text" prop is passed and the slot is provided', content: 'Content', props: { text } },
  { slot: 'content', case: 'with content when the "text" prop is not passed and the slot is provided', content: 'Content', props: { text: empty } },
]

export const slotContentNoProvidedTestCases: TSlotTestCase<string, Partial<IYCoreTooltipProps>>[] = [
  { slot: 'content', case: 'with content when the "text" prop is passed and the slot is not provided', content: empty, props: { text } },
  { slot: 'content', case: 'without content when the "text" prop is not passed and the slot is not provided', content: empty, props: { text: empty } },
]
