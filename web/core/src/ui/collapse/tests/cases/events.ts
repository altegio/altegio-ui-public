import type { TEventTestCase } from '~shared/types/tests'

export const eventCollapseChangeCases: TEventTestCase[] = [
  {
    event: 'collapse-change',
    case: 'при изменении значения (открытие/закрытие айтема)',
    nodeEventName: 'collapse-item-click',
  },
]

export const eventCollapseMoveCases: TEventTestCase[] = [
  {
    event: 'collapse-move',
    case: 'при изменении порядка айтемов drag-and-drop',
    nodeEventName: 'drop',
  },
]
