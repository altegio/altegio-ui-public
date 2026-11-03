import type { TEventTestCase } from '~shared/types/tests'

export const eventCollapseChangeCases: TEventTestCase[] = [
  {
    event: 'collapse-change',
    case: 'on value change (item open/close)',
    nodeEventName: 'collapse-item-click',
  },
]

export const eventCollapseMoveCases: TEventTestCase[] = [
  {
    event: 'collapse-move',
    case: 'on drag-and-drop item reorder',
    nodeEventName: 'drop',
  },
]
