import {
  createCoreSimpleButtonExternalProps,
  createCoreSimpleButtonInternalProps,
  type IAltCoreSimpleButtonExternalProps,
  type IAltCoreSimpleButtonInternalProps,
} from '~core/ui/simpleButton/models/types'

export interface IAltNgSimpleButtonProps extends
  IAltCoreSimpleButtonExternalProps,
  IAltCoreSimpleButtonInternalProps {}

export const createNgSimpleButtonProps = (): IAltNgSimpleButtonProps => ({
  ...createCoreSimpleButtonExternalProps(),
  ...createCoreSimpleButtonInternalProps(),
})

export * from '~core/ui/simpleButton/models/types'
