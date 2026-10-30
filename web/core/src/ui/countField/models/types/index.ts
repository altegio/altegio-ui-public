import {
  createCoreCountFieldExternalProps,
  type IAltCoreCountFieldExternalProps,
} from './external'
import {
  createCoreCountFieldInternalProps,
  type IAltCoreCountFieldInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'
export * from './constants'

export interface IAltCoreCountFieldProps extends IAltCoreCountFieldExternalProps, IAltCoreCountFieldInternalProps {}

export const createCoreCountFieldProps = (): IAltCoreCountFieldProps => ({
  ...createCoreCountFieldExternalProps(),
  ...createCoreCountFieldInternalProps(),
})
