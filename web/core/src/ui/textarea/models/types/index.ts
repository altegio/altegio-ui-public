import {
  createCoreTextareaExternalProps,
  type IYCoreTextareaExternalProps,
} from './external'
import {
  createCoreTextareaInternalProps,
  type IYCoreTextareaInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IYCoreTextareaProps extends IYCoreTextareaExternalProps, IYCoreTextareaInternalProps {}

export const createCoreTextareaProps = (): IYCoreTextareaProps => ({
  ...createCoreTextareaExternalProps(),
  ...createCoreTextareaInternalProps(),
})
