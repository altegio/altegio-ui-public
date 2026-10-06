import {
  type IYCoreIconExternalProps,
  createCoreIconExternalProps,
} from './external'

export * from './external'

export interface IYCoreIconProps extends IYCoreIconExternalProps {}

export const createCoreIconProps = (): IYCoreIconProps => ({ ...createCoreIconExternalProps() })
