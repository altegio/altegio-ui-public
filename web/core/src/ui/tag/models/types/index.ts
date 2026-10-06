import {
  createCoreTagExternalProps,
  type IYTagExternalProps,
} from './external'
import {
  createCoreTagInternalProps,
  type IYCoreTagInternalProps,
} from './internal'

export * from './external'
export * from './events'
export * from './internal'

export interface IYCoreTagProps extends IYTagExternalProps, IYCoreTagInternalProps {}

export const createCoreTagProps = (): IYCoreTagProps => ({
  ...createCoreTagExternalProps(),
  ...createCoreTagInternalProps(),
})
