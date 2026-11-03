import {
  createCoreFieldAvatarExternalProps,
  type IAltCoreFieldAvatarExternalProps,
} from './external'
import {
  createCoreFieldAvatarInternalProps,
  type IAltCoreFieldAvatarInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreFieldAvatarProps extends IAltCoreFieldAvatarExternalProps, IAltCoreFieldAvatarInternalProps {}

export const createCoreFieldAvatarProps = (): IAltCoreFieldAvatarProps => ({
  ...createCoreFieldAvatarExternalProps(),
  ...createCoreFieldAvatarInternalProps(),
})
