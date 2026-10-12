import {
  createCoreDropdownListProps,
  type IYCoreDropdownListProps,
} from '~core/ui/dropdownList/models/types'

export { ItemClickEvent as YNgDropdownListItemClickEvent } from '~core/ui/dropdownList/models/types/events'

export interface IYNgDropdownListProps extends IYCoreDropdownListProps {}

export const createNgDropdownListProps = (): IYNgDropdownListProps => createCoreDropdownListProps()
