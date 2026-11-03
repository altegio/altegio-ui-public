import {
  createCoreFieldAvatarProps,
  type IAltCoreFieldAvatarProps,
} from '~core/ui/fieldAvatar/models/types'

export interface IAltNgFieldAvatarProps extends IAltCoreFieldAvatarProps {}

export const createNgFieldAvatarProps = (): IAltNgFieldAvatarProps => createCoreFieldAvatarProps()
