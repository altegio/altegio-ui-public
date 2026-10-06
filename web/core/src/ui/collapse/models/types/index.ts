import {
  createCoreCollapseExternalProps,
  type IYCoreCollapseExternalProps,
} from './external'
import {
  createCoreCollapseInternalProps,
  type IYCoreCollapseInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IYCoreCollapseProps extends IYCoreCollapseExternalProps, IYCoreCollapseInternalProps {}

export const createCoreCollapseProps = (): IYCoreCollapseProps => ({
  ...createCoreCollapseExternalProps(),
  ...createCoreCollapseInternalProps(),
})
