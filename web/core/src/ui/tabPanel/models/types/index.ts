import {
  createCoreTabPanelExternalProps,
  type IAltCoreTabPanelExternalProps,
} from './external'
import {
  createCoreTabPanelInternalProps,
  type IAltCoreTabPanelInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreTabPanelProps extends IAltCoreTabPanelExternalProps, IAltCoreTabPanelInternalProps {}

export const createCoreTabPanelProps = (): IAltCoreTabPanelProps => ({
  ...createCoreTabPanelExternalProps(),
  ...createCoreTabPanelInternalProps(),
})
