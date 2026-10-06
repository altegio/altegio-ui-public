import {
  createCoreSimpleToggleInternalProps,
  type IYCoreSimpleToggleInternalProps,
} from './internal'
import {
  createCoreSimpleToggleExternalProps,
  type IYCoreSimpleToggleExternalProps,
} from './external'

export * from './events'
export * from './external'
export * from './internal'
export * from './constants'

export interface IYCoreSimpleToggleProps extends IYCoreSimpleToggleInternalProps, IYCoreSimpleToggleExternalProps {}

export const createCoreSimpleToggleProps = (): IYCoreSimpleToggleProps => {
  return {
    ...createCoreSimpleToggleInternalProps(),
    ...createCoreSimpleToggleExternalProps(),
  }
}
