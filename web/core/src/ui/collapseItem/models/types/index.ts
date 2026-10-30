import {
  createCoreCollapseItemExternalProps,
  type IAltCoreCollapseItemExternalProps,
} from './external'
import {
  createCoreCollapseItemInternalProps,
  type IAltCoreCollapseItemInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCoreCollapseItemProps extends IAltCoreCollapseItemExternalProps, IAltCoreCollapseItemInternalProps {}

export const createCoreCollapseItemProps = (): IAltCoreCollapseItemProps => ({
  ...createCoreCollapseItemExternalProps(),
  ...createCoreCollapseItemInternalProps(),
})
