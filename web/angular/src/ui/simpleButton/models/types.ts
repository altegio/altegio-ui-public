import {
  createCoreSimpleButtonExternalProps,
  createCoreSimpleButtonInternalProps,
  type IYCoreSimpleButtonExternalProps,
  type IYCoreSimpleButtonInternalProps,
} from '~core/ui/simpleButton/models/types'

export interface IYNgSimpleButtonProps extends
  IYCoreSimpleButtonExternalProps,
  IYCoreSimpleButtonInternalProps {}

export const createNgSimpleButtonProps = (): IYNgSimpleButtonProps => ({
  ...createCoreSimpleButtonExternalProps(),
  ...createCoreSimpleButtonInternalProps(),
})

export * from '~core/ui/simpleButton/models/types'
