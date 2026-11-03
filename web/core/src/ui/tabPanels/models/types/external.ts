export type TAltCoreTabPanelName = string | number

export interface IAltCoreTabPanelsExternalProps {
  value: TAltCoreTabPanelName | undefined
}

export const createCoreTabPanelsExternalProps = (): IAltCoreTabPanelsExternalProps => ({ value: undefined })
