import {
  createCoreAvatarProps,
  type IYCoreAvatarProps,
} from '~core/ui/avatar/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreAvatarProps extends IYCoreAvatarProps {}

export interface IYVueAvatarProps {
  photo?: IYVueCoreAvatarProps['photo']
  initials?: IYVueCoreAvatarProps['initials']
  size?: IYVueCoreAvatarProps['size']
  icon?: IYVueCoreAvatarProps['icon']
  disabled?: IYVueCoreAvatarProps['disabled']
}

export const createVueAvatarProps = (): TDefinedVueProps<IYVueAvatarProps> => {
  const { photo, initials, size, icon, disabled } = createCoreAvatarProps()
  return {
    photo,
    initials,
    size,
    disabled,
    icon: icon ? () => icon : undefined,
  }
}
