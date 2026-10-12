import {
  ItemClickEvent as DropdownListItemClickEvent,
} from '~core/ui/dropdownList/models/types/events'
import {
  VisibleEvent as DropdownVisibleEvent,
} from '~core/ui/dropdown/models/types/events'

export class ItemClickEvent extends DropdownListItemClickEvent {}
export class VisibleEvent extends DropdownVisibleEvent {}
