import {
  createCoreSimpleButtonExternalProps,
  type IAltCoreSimpleButtonExternalProps,
} from './external'
import {
  createCoreSimpleButtonInternalProps,
  type IAltCoreSimpleButtonInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreSimpleButtonProps extends IAltCoreSimpleButtonExternalProps, IAltCoreSimpleButtonInternalProps {}

export const createCoreSimpleButtonProps = (): IAltCoreSimpleButtonProps => {
  return {
    ...createCoreSimpleButtonExternalProps(),
    ...createCoreSimpleButtonInternalProps(),
  }
}
