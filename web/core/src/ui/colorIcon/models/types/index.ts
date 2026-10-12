import {
  createCoreColorIconExternalProps,
  type IYCoreColorIconExternalProps,
} from './external'

export * from './external'

export interface IYCoreColorIconProps extends IYCoreColorIconExternalProps {}

export const createCoreColorIconProps = (): IYCoreColorIconProps => ({ ...createCoreColorIconExternalProps() })
