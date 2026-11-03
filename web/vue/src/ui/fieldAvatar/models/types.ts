import {
  createCoreFieldAvatarProps,
  type IAltCoreFieldAvatarProps,
} from '~core/ui/fieldAvatar/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreFieldAvatarProps extends IAltCoreFieldAvatarProps {}

export interface IAltVueFieldAvatarProps {
  photo?: IAltVueCoreFieldAvatarProps['photo']
  initials?: IAltVueCoreFieldAvatarProps['initials']
  icon?: IAltVueCoreFieldAvatarProps['icon']
  disabled?: IAltVueCoreFieldAvatarProps['disabled']
  size?: IAltVueCoreFieldAvatarProps['size']
}

export const createVueFieldAvatarProps = (): TDefinedVueProps<IAltVueFieldAvatarProps> => {
  const { photo, initials, icon, disabled, size } = createCoreFieldAvatarProps()
  return {
    photo,
    initials,
    icon: icon ? () => icon : undefined,
    disabled,
    size,
  }
}
