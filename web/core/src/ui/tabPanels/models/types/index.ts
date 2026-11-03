import {
  createCoreTabPanelsExternalProps,
  type IAltCoreTabPanelsExternalProps,
} from './external'
import {
  createCoreTabPanelsInternalProps,
  type IAltCoreTabPanelsInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreTabPanelsProps extends IAltCoreTabPanelsExternalProps, IAltCoreTabPanelsInternalProps {}

export const createCoreTabPanelsProps = (): IAltCoreTabPanelsProps => ({
  ...createCoreTabPanelsExternalProps(),
  ...createCoreTabPanelsInternalProps(),
})
