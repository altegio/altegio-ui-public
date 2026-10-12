import {
  createCoreFieldTextareaExternalProps,
  type IYCoreFieldTextareaExternalProps,
} from './external'
import {
  createCoreFieldTextareaInternalProps,
  type IYCoreFieldTextareaInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IYCoreFieldTextareaProps extends IYCoreFieldTextareaExternalProps, IYCoreFieldTextareaInternalProps {}

export const createCoreFieldTextareaProps = (): IYCoreFieldTextareaProps => ({
  ...createCoreFieldTextareaExternalProps(),
  ...createCoreFieldTextareaInternalProps(),
})
