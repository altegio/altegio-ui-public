import {
  createCoreCollapseItemExternalProps,
  type IYCoreCollapseItemExternalProps,
} from './external'
import {
  createCoreCollapseItemInternalProps,
  type IYCoreCollapseItemInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IYCoreCollapseItemProps extends IYCoreCollapseItemExternalProps, IYCoreCollapseItemInternalProps {}

export const createCoreCollapseItemProps = (): IYCoreCollapseItemProps => ({
  ...createCoreCollapseItemExternalProps(),
  ...createCoreCollapseItemInternalProps(),
})
