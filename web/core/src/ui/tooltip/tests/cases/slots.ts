import type { TSlotTestCase } from '~shared/types/tests'
import type { IYCoreTooltipProps } from '~core/ui/tooltip/models/types'
import { empty, text } from '~shared/tests/slotContents'

export const slotContentProvidedTestCases: TSlotTestCase<string, Partial<IYCoreTooltipProps>>[] = [
  { slot: 'content', case: 'с контентом, если prop "text" передан и слот предоставлен', content: 'Content', props: { text } },
  { slot: 'content', case: 'с контентом, если prop "text" не передан и слот предоставлен', content: 'Content', props: { text: empty } },
]

export const slotContentNoProvidedTestCases: TSlotTestCase<string, Partial<IYCoreTooltipProps>>[] = [
  { slot: 'content', case: 'с контентом, если prop "text" передан и слот не предоставлен', content: empty, props: { text } },
  { slot: 'content', case: 'без контента, если prop "text" не передан и слот не предоставлен', content: empty, props: { text: empty } },
]
