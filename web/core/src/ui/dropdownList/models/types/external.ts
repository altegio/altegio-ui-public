import type { IDropdownListItem } from '~shared/types/global'

export interface IYCoreDropdownListExternalProps {
  items: IDropdownListItem[] | undefined
  itemLabel: keyof IDropdownListItem | undefined
  minWidth: string | undefined
  noMaxHeight: boolean | undefined
}

export const createCoreDropdownListExternalProps = (): IYCoreDropdownListExternalProps => ({
  items: [],
  itemLabel: 'label',
  minWidth: '88px',
  noMaxHeight: false,
})
