import {
  type IAltCoreFieldWrapperProps,
  createCoreFieldWrapperProps,
} from '~core/ui/fieldWrapper/models/types'
import {
  type IAltCoreAvatarProps,
  createCoreAvatarProps,
} from '~core/ui/avatar/models/types'
import type { IAltCoreFieldAvatarProps } from '~core/ui/fieldAvatar/models/types/index'
import { EAltSizes } from '~shared/types/global'

export interface IAltCoreFieldAvatarExternalProps extends
  Pick<IAltCoreFieldWrapperProps, 'disabled' | 'size'>,
  Pick<IAltCoreAvatarProps, 'photo' | 'initials' | 'icon'> {}

export const mapSizeToAvatarSize: Record<NonNullable<IAltCoreFieldAvatarProps['size']>, NonNullable<IAltCoreAvatarProps['size']>> = {
  [EAltSizes.SMALL]: EAltSizes.EXTRA_SMALL,
  [EAltSizes.MEDIUM]: EAltSizes.EXTRA_SMALL,
  [EAltSizes.LARGE]: EAltSizes.SMALL,
}

export const createCoreFieldAvatarExternalProps = (): IAltCoreFieldAvatarExternalProps => {
  const { disabled, size } = createCoreFieldWrapperProps()
  const { photo, initials, icon } = createCoreAvatarProps()

  return {
    disabled,
    size,
    photo,
    initials,
    icon,
  }
}
