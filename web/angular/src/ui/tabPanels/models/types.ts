import {
  createCoreTabPanelsExternalProps,
  type IAltCoreTabPanelsExternalProps,
} from '~core/ui/tabPanels/models/types'

export interface IAltNgTabPanelsProps extends IAltCoreTabPanelsExternalProps {}

export const createNgTabPanelsProps = (): IAltNgTabPanelsProps => createCoreTabPanelsExternalProps()
