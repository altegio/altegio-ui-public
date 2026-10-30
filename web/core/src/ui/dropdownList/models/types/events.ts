import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IDropdownListItem } from '~shared/types/global'

export interface IAltCoreDropdownListItemClickEvent {
  item: IDropdownListItem
}

export class ItemClickEvent extends CustomEvent<IAltCoreDropdownListItemClickEvent> {}

export type TAltCoreDropdownListEvents = TEventsStoryArgs<{ ItemClickEvent: typeof ItemClickEvent }>
