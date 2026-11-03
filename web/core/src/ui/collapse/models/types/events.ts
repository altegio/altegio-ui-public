import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IAltCoreCollapseProps } from './index'

export interface IAltCoreCollapseChangePayload {
  event: Event
  value: IAltCoreCollapseProps['value']
}

export interface IAltCoreCollapseMovePayload {
  event: DragEvent
  order: IAltCoreCollapseProps['value'][]
}

export class CollapseChangeEvent extends CustomEvent<IAltCoreCollapseChangePayload> {}

export class CollapseMoveEvent extends CustomEvent<IAltCoreCollapseMovePayload> {}

export type TAltCoreCollapseEvents = TEventsStoryArgs<{
  CollapseChangeEvent: typeof CollapseChangeEvent
  CollapseMoveEvent: typeof CollapseMoveEvent
}>
