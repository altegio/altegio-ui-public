import {
  createCoreFieldAvatarProps,
  type IYCoreFieldAvatarProps,
} from '~core/ui/fieldAvatar/models/types'

export interface IYNgFieldAvatarProps extends IYCoreFieldAvatarProps {}

export const createNgFieldAvatarProps = (): IYNgFieldAvatarProps => createCoreFieldAvatarProps()
