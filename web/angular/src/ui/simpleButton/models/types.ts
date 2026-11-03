import {
  createCoreSimpleButtonExternalProps,
  createCoreSimpleButtonInternalProps,
  type IAltCoreSimpleButtonExternalProps,
  type IAltCoreSimpleButtonInternalProps,
} from '~core/ui/simpleButton/models/types'

// accessibleCurrent is set by core components only
export interface IAltNgSimpleButtonProps extends
  IAltCoreSimpleButtonExternalProps,
  Omit<IAltCoreSimpleButtonInternalProps, 'accessibleCurrent'> {}

export const createNgSimpleButtonProps = (): IAltNgSimpleButtonProps => ({
  ...createCoreSimpleButtonExternalProps(),
  ...createCoreSimpleButtonInternalProps(),
})

export * from '~core/ui/simpleButton/models/types'
