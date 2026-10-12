import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IYCoreCollapseItemProps } from './index'

export interface IYCoreCollapseItemCollapseItemClickPayload {
  event: Event
  value: IYCoreCollapseItemProps['value']
  opened: IYCoreCollapseItemProps['opened']
}

export class CollapseItemClickEvent extends CustomEvent<IYCoreCollapseItemCollapseItemClickPayload> {}

export type TYCoreCollapseItemEvents = TEventsStoryArgs<{
  CollapseItemClickEvent: typeof CollapseItemClickEvent
}>
