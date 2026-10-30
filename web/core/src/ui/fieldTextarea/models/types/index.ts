import {
  createCoreFieldTextareaExternalProps,
  type IAltCoreFieldTextareaExternalProps,
} from './external'
import {
  createCoreFieldTextareaInternalProps,
  type IAltCoreFieldTextareaInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCoreFieldTextareaProps extends IAltCoreFieldTextareaExternalProps, IAltCoreFieldTextareaInternalProps {}

export const createCoreFieldTextareaProps = (): IAltCoreFieldTextareaProps => ({
  ...createCoreFieldTextareaExternalProps(),
  ...createCoreFieldTextareaInternalProps(),
})
