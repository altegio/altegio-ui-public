import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IDropdownListItem } from '~shared/types/global'

export interface IYCoreDropdownListItemClickEvent {
  item: IDropdownListItem
}

export class ItemClickEvent extends CustomEvent<IYCoreDropdownListItemClickEvent> {}

export type TYCoreDropdownListEvents = TEventsStoryArgs<{ ItemClickEvent: typeof ItemClickEvent }>
