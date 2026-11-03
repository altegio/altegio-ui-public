import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreDropdownListProps,
  type IAltCoreDropdownListProps,
  type ItemClickEvent,
} from '~core/ui/dropdownList/models/types'

export interface IAltVueCoreDropdownListProps extends IAltCoreDropdownListProps {}

export interface IAltVueDropdownListProps {
  items?: IAltVueCoreDropdownListProps['items']
  itemLabel?: IAltVueCoreDropdownListProps['itemLabel']
  minWidth?: IAltVueCoreDropdownListProps['minWidth']
  noMaxHeight?: IAltVueCoreDropdownListProps['noMaxHeight']
}

export const createVueDropdownListProps = (): TDefinedVueProps<IAltVueDropdownListProps> => {
  const { items, itemLabel, minWidth, noMaxHeight } = createCoreDropdownListProps()
  return {
    items: items ? () => items : undefined,
    itemLabel,
    minWidth,
    noMaxHeight,
  }
}

export interface IAltVueDropdownListEmits {
  (event: 'item-click', payload: ItemClickEvent): void
}
