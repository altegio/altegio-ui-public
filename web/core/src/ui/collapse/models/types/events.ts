import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IYCoreCollapseProps } from './index'

export interface IYCoreCollapseChangePayload {
  event: Event
  value: IYCoreCollapseProps['value']
}

export interface IYCoreCollapseMovePayload {
  event: DragEvent
  order: IYCoreCollapseProps['value'][]
}

export class CollapseChangeEvent extends CustomEvent<IYCoreCollapseChangePayload> {}

export class CollapseMoveEvent extends CustomEvent<IYCoreCollapseMovePayload> {}

export type TYCoreCollapseEvents = TEventsStoryArgs<{
  CollapseChangeEvent: typeof CollapseChangeEvent
  CollapseMoveEvent: typeof CollapseMoveEvent
}>
