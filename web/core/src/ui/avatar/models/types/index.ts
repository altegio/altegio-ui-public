import {
  createCoreAvatarExternalProps,
  type IYCoreAvatarExternalProps,
} from './external'
import {
  createCoreAvatarInternalProps,
  type IYCoreAvatarInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IYCoreAvatarProps extends IYCoreAvatarExternalProps, IYCoreAvatarInternalProps {}

export const createCoreAvatarProps = (): IYCoreAvatarProps => ({
  ...createCoreAvatarExternalProps(),
  ...createCoreAvatarInternalProps(),
})
