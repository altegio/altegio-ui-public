import {
  createCoreIconButtonExternalProps,
  type IYCoreIconButtonExternalProps,
} from './external'

export * from './external'

export interface IYCoreIconButtonProps extends Omit<IYCoreIconButtonExternalProps, 'alignment'> {}

export const createCoreIconButtonProps = (): IYCoreIconButtonProps => ({ ...createCoreIconButtonExternalProps() })
