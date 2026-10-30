import {
  createCoreAvatarProps,
  type IAltCoreAvatarProps,
} from '~core/ui/avatar/models/types'

export interface IAltNgAvatarProps extends IAltCoreAvatarProps {}

export const createNgAvatarProps = (): IAltNgAvatarProps => createCoreAvatarProps()
