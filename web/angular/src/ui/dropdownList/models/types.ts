import {
  createCoreDropdownListProps,
  type IAltCoreDropdownListProps,
} from '~core/ui/dropdownList/models/types'

export { ItemClickEvent as AltNgDropdownListItemClickEvent } from '~core/ui/dropdownList/models/types/events'

export interface IAltNgDropdownListProps extends IAltCoreDropdownListProps {}

export const createNgDropdownListProps = (): IAltNgDropdownListProps => createCoreDropdownListProps()
