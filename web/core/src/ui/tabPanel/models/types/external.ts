import type { TAltCoreTabPanelName } from '~core/ui/tabPanels/models/types'

export interface IAltCoreTabPanelExternalProps {
  name: TAltCoreTabPanelName | undefined
  label: string | undefined
  labelledby: string | undefined
}

export const createCoreTabPanelExternalProps = (): IAltCoreTabPanelExternalProps => ({
  name: undefined,
  label: undefined,
  labelledby: undefined,
})
