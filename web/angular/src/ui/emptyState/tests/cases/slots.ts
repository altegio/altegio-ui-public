import type { TSlotTestCase } from '~shared/types/tests'
import type { IYCoreTooltipProps } from '~core/ui/tooltip/models/types'
import { empty } from '~shared/tests/slotContents'

export const slotActionsTestCases: TSlotTestCase<string, IYCoreTooltipProps>[] = [
  { slot: 'actions', case: 'с контентом', content: 'Content', expected: true },
  { slot: 'actions', case: 'без контента', content: empty, expected: false },
]
