import type { TEventTestCase } from '~shared/types/tests'

import {
  eventCollapseItemClickCases as coreEventCollapseItemClickCases,
} from '~core/ui/collapseItem/tests/cases/events'

import type {
  IAltCoreCollapseItemCollapseItemClickPayload,
} from '~core/ui/collapseItem/models/types'

export const eventCollapseItemClickCases: TEventTestCase<IAltCoreCollapseItemCollapseItemClickPayload, IAltCoreCollapseItemCollapseItemClickPayload>[] = coreEventCollapseItemClickCases.map((testCase) => ({
    ...testCase,
    payload: {
      event: new Event(testCase.nodeEventName),
      value: testCase.value,
      opened: false,
    },
    expected: {
      event: new Event(testCase.nodeEventName),
      value: testCase.value,
      opened: false,
    },
  }))
