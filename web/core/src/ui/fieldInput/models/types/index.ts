import {
  createCoreFieldInputExternalProps,
  type IYCoreFieldInputExternalProps,
} from './external'
import {
  createCoreFieldInputInternalProps,
  type IYCoreFieldInputInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IYCoreFieldInputProps extends IYCoreFieldInputExternalProps, IYCoreFieldInputInternalProps {}

export const createCoreFieldInputProps = (): IYCoreFieldInputProps => ({
  ...createCoreFieldInputExternalProps(),
  ...createCoreFieldInputInternalProps(),
})
