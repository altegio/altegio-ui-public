import type { IAltCoreTabExternalProps } from '~core/ui/tab/models/types/external'

export interface IAltCoreTabsItem extends IAltCoreTabExternalProps {}

export interface IAltCoreTabsExternalProps {
  tabs: IAltCoreTabsItem[] | undefined
  value: number | undefined
}

export const createCoreTabsExternalProps = (): IAltCoreTabsExternalProps => {
  return {
    tabs: [],
    value: 0,
  }
}
