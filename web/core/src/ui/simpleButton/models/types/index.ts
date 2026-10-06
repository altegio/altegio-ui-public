import {
  createCoreSimpleButtonExternalProps,
  type IYCoreSimpleButtonExternalProps,
} from './external'
import {
  createCoreSimpleButtonInternalProps,
  type IYCoreSimpleButtonInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IYCoreSimpleButtonProps extends IYCoreSimpleButtonExternalProps, IYCoreSimpleButtonInternalProps {}

export const createCoreSimpleButtonProps = (): IYCoreSimpleButtonProps => {
  return {
    ...createCoreSimpleButtonExternalProps(),
    ...createCoreSimpleButtonInternalProps(),
  }
}
