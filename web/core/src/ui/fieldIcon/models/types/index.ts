import {
  createCoreFieldIconExternalProps,
  type IYCoreFieldIconExternalProps,
} from './external'
import {
  createCoreFieldIconInternalProps,
  type IYCoreFieldIconInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IYCoreFieldIconProps extends IYCoreFieldIconExternalProps, IYCoreFieldIconInternalProps {}

export const createCoreFieldIconProps = (): IYCoreFieldIconProps => ({
  ...createCoreFieldIconExternalProps(),
  ...createCoreFieldIconInternalProps(),
})
