import type { TSlotTestCase } from '~shared/types/tests'
import type { IAltCoreTooltipProps } from '~core/ui/tooltip/models/types'
import { empty, text } from '~shared/tests/slotContents'

export const defaultTestProps = {
  content: text,
  activator: text,
}

export const slotContentTestCases: TSlotTestCase<string, IAltCoreTooltipProps>[] = [
  { slot: 'content', case: 'with content', content: text },
  { slot: 'content', case: 'without content', content: empty },
]

export const slotActivatorTestCases: TSlotTestCase<string, IAltCoreTooltipProps>[] = [
  { slot: 'activator', case: 'with content', content: text },
  { slot: 'activator', case: 'without content', content: empty },
]
