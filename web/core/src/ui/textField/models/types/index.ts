import {
  createCoreTextFieldExternalProps,
  type IYCoreTextFieldExternalProps,
} from './external'
import {
  createCoreTextFieldInternalProps,
  type IYCoreTextFieldInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'
export * from './constants'

export interface IYCoreTextFieldProps extends IYCoreTextFieldExternalProps, IYCoreTextFieldInternalProps {}

export const createCoreTextFieldProps = (): IYCoreTextFieldProps => ({
  ...createCoreTextFieldExternalProps(),
  ...createCoreTextFieldInternalProps(),
})
