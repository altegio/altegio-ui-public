import type { IYCoreTabExternalProps } from '~core/ui/tab/models/types/external'

export interface IYCoreTabsItem extends IYCoreTabExternalProps {}

export interface IYCoreTabsExternalProps {
  tabs: IYCoreTabsItem[] | undefined
  value: number | undefined
}

export const createCoreTabsExternalProps = (): IYCoreTabsExternalProps => {
  return {
    tabs: [],
    value: 0,
  }
}
