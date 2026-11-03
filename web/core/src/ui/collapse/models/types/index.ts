import {
  createCoreCollapseExternalProps,
  type IAltCoreCollapseExternalProps,
} from './external'
import {
  createCoreCollapseInternalProps,
  type IAltCoreCollapseInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCoreCollapseProps extends IAltCoreCollapseExternalProps, IAltCoreCollapseInternalProps {}

export const createCoreCollapseProps = (): IAltCoreCollapseProps => ({
  ...createCoreCollapseExternalProps(),
  ...createCoreCollapseInternalProps(),
})
