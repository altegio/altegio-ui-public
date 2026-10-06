import {
  createCoreFieldWrapperExternalProps,
  type IYCoreFieldWrapperExternalProps,
} from './external'
import {
  createCoreFieldWrapperInternalProps,
  type IYCoreFieldWrapperInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IYCoreFieldWrapperProps extends IYCoreFieldWrapperExternalProps, IYCoreFieldWrapperInternalProps {}

export const createCoreFieldWrapperProps = (): IYCoreFieldWrapperProps => ({
  ...createCoreFieldWrapperExternalProps(),
  ...createCoreFieldWrapperInternalProps(),
})
