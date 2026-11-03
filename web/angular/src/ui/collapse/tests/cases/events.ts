import type { TEventTestCase } from '~shared/types/tests'

import {
  eventCollapseChangeCases as coreEventCollapseChangeCases,
  eventCollapseMoveCases as coreEventCollapseMoveCases,
} from '~core/ui/collapse/tests/cases/events'

export const eventCollapseChangeCases: TEventTestCase[] = coreEventCollapseChangeCases.map((testCase) => ({
  ...testCase,
  nodeEventName: testCase.event,
}))

export const eventCollapseMoveCases: TEventTestCase[] = coreEventCollapseMoveCases.map((testCase) => ({
  ...testCase,
  nodeEventName: testCase.event,
}))
