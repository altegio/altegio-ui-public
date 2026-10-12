import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreDropdownListProps,
  type IYCoreDropdownListProps,
  type ItemClickEvent,
} from '~core/ui/dropdownList/models/types'

export interface IYVueCoreDropdownListProps extends IYCoreDropdownListProps {}

export interface IYVueDropdownListProps {
  items?: IYVueCoreDropdownListProps['items']
  itemLabel?: IYVueCoreDropdownListProps['itemLabel']
  minWidth?: IYVueCoreDropdownListProps['minWidth']
  noMaxHeight?: IYVueCoreDropdownListProps['noMaxHeight']
}

export const createVueDropdownListProps = (): TDefinedVueProps<IYVueDropdownListProps> => {
  const { items, itemLabel, minWidth, noMaxHeight } = createCoreDropdownListProps()
  return {
    items: items ? () => items : undefined,
    itemLabel,
    minWidth,
    noMaxHeight,
  }
}

export interface IYVueDropdownListEmits {
  (event: 'item-click', payload: ItemClickEvent): void
}
