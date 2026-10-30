import {
  createCoreTextareaExternalProps,
  type IAltCoreTextareaExternalProps,
} from './external'
import {
  createCoreTextareaInternalProps,
  type IAltCoreTextareaInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCoreTextareaProps extends IAltCoreTextareaExternalProps, IAltCoreTextareaInternalProps {}

export const createCoreTextareaProps = (): IAltCoreTextareaProps => ({
  ...createCoreTextareaExternalProps(),
  ...createCoreTextareaInternalProps(),
})
