import type { IDropdownListItem } from '~shared/types/global'

export interface IAltCoreDropdownListExternalProps {
  items: IDropdownListItem[] | undefined
  itemLabel: keyof IDropdownListItem | undefined
  minWidth: string | undefined
  noMaxHeight: boolean | undefined
}

export const createCoreDropdownListExternalProps = (): IAltCoreDropdownListExternalProps => ({
  items: [],
  itemLabel: 'label',
  minWidth: '88px',
  noMaxHeight: false,
})
