import {
  createCoreFieldAvatarExternalProps,
  type IYCoreFieldAvatarExternalProps,
} from './external'
import {
  createCoreFieldAvatarInternalProps,
  type IYCoreFieldAvatarInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IYCoreFieldAvatarProps extends IYCoreFieldAvatarExternalProps, IYCoreFieldAvatarInternalProps {}

export const createCoreFieldAvatarProps = (): IYCoreFieldAvatarProps => ({
  ...createCoreFieldAvatarExternalProps(),
  ...createCoreFieldAvatarInternalProps(),
})
