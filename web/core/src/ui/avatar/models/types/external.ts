import { EYSizes, type TYSizes } from '~shared/types/global'
import type { IYIcon } from '~shared/icons'

export interface IYCoreAvatarExternalProps {
  size: Extract<TYSizes, 'extra-small' | 'small' | 'medium' | 'large'> | undefined
  initials: string | undefined
  photo: string | undefined
  icon: IYIcon | undefined
  disabled: boolean | undefined
}

export const createCoreAvatarExternalProps = (): IYCoreAvatarExternalProps => ({
  size: EYSizes.MEDIUM,
  initials: '',
  photo: '',
  icon: undefined,
  disabled: false,
})
