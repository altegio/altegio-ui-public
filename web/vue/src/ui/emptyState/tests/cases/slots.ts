import type { TSlotTestCase } from '~shared/types/tests'
import type { IYCoreTooltipProps } from '~core/ui/tooltip/models/types'
import { empty } from '~shared/tests/slotContents'

export const slotActionsTestCases: TSlotTestCase<string, IYCoreTooltipProps>[] = [
  { slot: 'actions', case: 'with content', content: 'Content', expected: true },
  { slot: 'actions', case: 'without content', content: empty, expected: false },
]
