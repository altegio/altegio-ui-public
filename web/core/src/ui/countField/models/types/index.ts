import {
  createCoreCountFieldExternalProps,
  type IYCoreCountFieldExternalProps,
} from './external'
import {
  createCoreCountFieldInternalProps,
  type IYCoreCountFieldInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'
export * from './constants'

export interface IYCoreCountFieldProps extends IYCoreCountFieldExternalProps, IYCoreCountFieldInternalProps {}

export const createCoreCountFieldProps = (): IYCoreCountFieldProps => ({
  ...createCoreCountFieldExternalProps(),
  ...createCoreCountFieldInternalProps(),
})
