import type { TEventTestCase } from '~shared/types/tests'

import {
  eventCollapseItemClickCases as coreEventCollapseItemClickCases,
} from '~core/ui/collapseItem/tests/cases/events'

export const eventCollapseItemClickCases: TEventTestCase[] = coreEventCollapseItemClickCases.map((testCase) => ({
  ...testCase,
  nodeEventName: testCase.event,
}))
