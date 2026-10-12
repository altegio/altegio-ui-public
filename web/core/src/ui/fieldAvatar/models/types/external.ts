import {
  type IYCoreFieldWrapperProps,
  createCoreFieldWrapperProps,
} from '~core/ui/fieldWrapper/models/types'
import {
  type IYCoreAvatarProps,
  createCoreAvatarProps,
} from '~core/ui/avatar/models/types'
import type { IYCoreFieldAvatarProps } from '~core/ui/fieldAvatar/models/types/index'
import { EYSizes } from '~shared/types/global'

export interface IYCoreFieldAvatarExternalProps extends
  Pick<IYCoreFieldWrapperProps, 'disabled' | 'size'>,
  Pick<IYCoreAvatarProps, 'photo' | 'initials' | 'icon'> {}

export const mapSizeToAvatarSize: Record<NonNullable<IYCoreFieldAvatarProps['size']>, NonNullable<IYCoreAvatarProps['size']>> = {
  [EYSizes.SMALL]: EYSizes.EXTRA_SMALL,
  [EYSizes.MEDIUM]: EYSizes.EXTRA_SMALL,
  [EYSizes.LARGE]: EYSizes.SMALL,
}

export const createCoreFieldAvatarExternalProps = (): IYCoreFieldAvatarExternalProps => {
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
