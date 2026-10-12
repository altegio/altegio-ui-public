import {
  createCoreFieldAvatarProps,
  type IYCoreFieldAvatarProps,
} from '~core/ui/fieldAvatar/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreFieldAvatarProps extends IYCoreFieldAvatarProps {}

export interface IYVueFieldAvatarProps {
  photo?: IYVueCoreFieldAvatarProps['photo']
  initials?: IYVueCoreFieldAvatarProps['initials']
  icon?: IYVueCoreFieldAvatarProps['icon']
  disabled?: IYVueCoreFieldAvatarProps['disabled']
  size?: IYVueCoreFieldAvatarProps['size']
}

export const createVueFieldAvatarProps = (): TDefinedVueProps<IYVueFieldAvatarProps> => {
  const { photo, initials, icon, disabled, size } = createCoreFieldAvatarProps()
  return {
    photo,
    initials,
    icon: icon ? () => icon : undefined,
    disabled,
    size,
  }
}
