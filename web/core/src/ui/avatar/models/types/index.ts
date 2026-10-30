import {
  createCoreAvatarExternalProps,
  type IAltCoreAvatarExternalProps,
} from './external'
import {
  createCoreAvatarInternalProps,
  type IAltCoreAvatarInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreAvatarProps extends IAltCoreAvatarExternalProps, IAltCoreAvatarInternalProps {}

export const createCoreAvatarProps = (): IAltCoreAvatarProps => ({
  ...createCoreAvatarExternalProps(),
  ...createCoreAvatarInternalProps(),
})
