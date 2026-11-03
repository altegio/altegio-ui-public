import {
  createCoreTabPanelExternalProps,
  type IAltCoreTabPanelExternalProps,
} from '~core/ui/tabPanel/models/types'

export interface IAltNgTabPanelProps extends IAltCoreTabPanelExternalProps {}

export const createNgTabPanelProps = (): IAltNgTabPanelProps => createCoreTabPanelExternalProps()
