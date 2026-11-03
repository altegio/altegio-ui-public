import {
  createCoreAvatarProps,
  type IAltCoreAvatarProps,
} from '~core/ui/avatar/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreAvatarProps extends IAltCoreAvatarProps {}

export interface IAltVueAvatarProps {
  photo?: IAltVueCoreAvatarProps['photo']
  initials?: IAltVueCoreAvatarProps['initials']
  size?: IAltVueCoreAvatarProps['size']
  icon?: IAltVueCoreAvatarProps['icon']
  disabled?: IAltVueCoreAvatarProps['disabled']
}

export const createVueAvatarProps = (): TDefinedVueProps<IAltVueAvatarProps> => {
  const { photo, initials, size, icon, disabled } = createCoreAvatarProps()
  return {
    photo,
    initials,
    size,
    disabled,
    icon: icon ? () => icon : undefined,
  }
}
