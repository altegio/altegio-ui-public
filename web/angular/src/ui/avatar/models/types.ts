import {
  createCoreAvatarProps,
  type IYCoreAvatarProps,
} from '~core/ui/avatar/models/types'

export interface IYNgAvatarProps extends IYCoreAvatarProps {}

export const createNgAvatarProps = (): IYNgAvatarProps => createCoreAvatarProps()
