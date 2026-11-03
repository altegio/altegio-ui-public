import { EAltSizes, type TAltSizes } from '~shared/types/global'
import type { IAltIcon } from '~shared/icons'

export interface IAltCoreAvatarExternalProps {
  size: Extract<TAltSizes, 'extra-small' | 'small' | 'medium' | 'large'> | undefined
  initials: string | undefined
  photo: string | undefined
  icon: IAltIcon | undefined
  disabled: boolean | undefined
}

export const createCoreAvatarExternalProps = (): IAltCoreAvatarExternalProps => ({
  size: EAltSizes.MEDIUM,
  initials: '',
  photo: '',
  icon: undefined,
  disabled: false,
})
