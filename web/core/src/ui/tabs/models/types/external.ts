import type { IAltCoreTabExternalProps } from '~core/ui/tab/models/types/external'

export interface IAltCoreTabsItem extends IAltCoreTabExternalProps {}

export interface IAltCoreTabsExternalProps {
  tabs: IAltCoreTabsItem[] | undefined
  value: number | undefined

  /** Accessible name of the tab list, for example "Client card sections" */
  accessibleName: string | undefined
}

export const createCoreTabsExternalProps = (): IAltCoreTabsExternalProps => {
  return {
    tabs: [],
    value: 0,
    accessibleName: undefined,
  }
}
