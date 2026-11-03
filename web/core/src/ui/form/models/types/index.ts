import {
  createCoreFormExternalProps,
  type IAltCoreFormExternalProps,
} from './external'
import {
  createCoreFormInternalProps,
  type IAltCoreFormInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCoreFormProps extends IAltCoreFormExternalProps, IAltCoreFormInternalProps {}

export const createCoreFormProps = (): IAltCoreFormProps => ({
  ...createCoreFormExternalProps(),
  ...createCoreFormInternalProps(),
})
