import {
  createCoreTextFieldExternalProps,
  type IAltCoreTextFieldExternalProps,
} from './external'
import {
  createCoreTextFieldInternalProps,
  type IAltCoreTextFieldInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'
export * from './constants'

export interface IAltCoreTextFieldProps extends IAltCoreTextFieldExternalProps, IAltCoreTextFieldInternalProps {}

export const createCoreTextFieldProps = (): IAltCoreTextFieldProps => ({
  ...createCoreTextFieldExternalProps(),
  ...createCoreTextFieldInternalProps(),
})
