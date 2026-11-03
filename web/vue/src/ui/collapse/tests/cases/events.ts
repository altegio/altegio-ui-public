import type { TEventTestCase } from '~shared/types/tests'

import {
  eventCollapseChangeCases as coreEventCollapseChangeCases,
  eventCollapseMoveCases as coreEventCollapseMoveCases,
} from '~core/ui/collapse/tests/cases/events'

import type {
  IAltCoreCollapseChangePayload,
  IAltCoreCollapseMovePayload,
} from '~core/ui/collapse/models/types'

export const eventCollapseChangeCases: TEventTestCase<IAltCoreCollapseChangePayload, IAltCoreCollapseChangePayload>[] = coreEventCollapseChangeCases.map((testCase) => ({
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

export const eventCollapseMoveCases: TEventTestCase<IAltCoreCollapseMovePayload, IAltCoreCollapseMovePayload>[] = coreEventCollapseMoveCases.map((testCase) => ({
    ...testCase,
    payload: {
      event: new DragEvent(testCase.nodeEventName),
      order: [],
    },
    expected: {
      event: new DragEvent(testCase.nodeEventName),
      order: [],
    },
  }))
