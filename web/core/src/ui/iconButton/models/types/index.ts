import {
  createCoreIconButtonExternalProps,
  type IAltCoreIconButtonExternalProps,
} from './external'

export * from './external'

export interface IAltCoreIconButtonProps extends Omit<IAltCoreIconButtonExternalProps, 'alignment'> {}

export const createCoreIconButtonProps = (): IAltCoreIconButtonProps => ({ ...createCoreIconButtonExternalProps() })
