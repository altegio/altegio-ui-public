import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IAltCoreCollapseItemProps } from './index'

export interface IAltCoreCollapseItemCollapseItemClickPayload {
  event: Event
  value: IAltCoreCollapseItemProps['value']
  opened: IAltCoreCollapseItemProps['opened']
}

export class CollapseItemClickEvent extends CustomEvent<IAltCoreCollapseItemCollapseItemClickPayload> {}

export type TAltCoreCollapseItemEvents = TEventsStoryArgs<{
  CollapseItemClickEvent: typeof CollapseItemClickEvent
}>
