import {
  createCoreVirtualScrollExternalProps,
  type IAltCoreVirtualScrollExternalProps,
} from './external'
import {
  createCoreVirtualScrollInternalProps,
  type IAltCoreVirtualScrollInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCoreVirtualScrollProps extends IAltCoreVirtualScrollExternalProps, IAltCoreVirtualScrollInternalProps {}

export const createCoreVirtualScrollProps = (): IAltCoreVirtualScrollProps => ({
  ...createCoreVirtualScrollExternalProps(),
  ...createCoreVirtualScrollInternalProps(),
})
