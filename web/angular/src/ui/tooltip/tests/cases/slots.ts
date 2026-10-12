import type { TSlotTestCase } from '~shared/types/tests'
import type { IYCoreTooltipProps } from '~core/ui/tooltip/models/types'
import { empty, text } from '~shared/tests/slotContents'

export const slotContentTestCases: TSlotTestCase<string, IYCoreTooltipProps>[] = [
  { slot: 'content', case: 'с контентом', content: text },
  { slot: 'content', case: 'без контента', content: empty },
]

export const slotActivatorTestCases: TSlotTestCase<string, IYCoreTooltipProps>[] = [
  { slot: 'activator', case: 'с контентом', content: text },
  { slot: 'activator', case: 'без контента', content: empty },
]
