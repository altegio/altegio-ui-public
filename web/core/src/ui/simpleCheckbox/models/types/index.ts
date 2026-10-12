import {
  createCoreSimpleCheckboxExternalProps,
  type IYCoreSimpleCheckboxExternalProps,
} from './external'
import {
  createCoreSimpleCheckboxInternalProps,
  type IYCoreSimpleCheckboxInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'


export interface IYCoreSimpleCheckboxProps extends IYCoreSimpleCheckboxExternalProps, IYCoreSimpleCheckboxInternalProps {}

export const createCoreSimpleCheckboxProps = (): IYCoreSimpleCheckboxProps => {
  return {
    ...createCoreSimpleCheckboxExternalProps(),
    ...createCoreSimpleCheckboxInternalProps(),
  }
}
