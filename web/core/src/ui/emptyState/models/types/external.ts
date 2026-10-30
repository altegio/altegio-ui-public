import { type IAltIcon, altMagic } from '~shared/icons'
import type { TAltSizes } from '~shared/types/global'
import { EAltSizes } from '~shared/types/global'

export interface IAltCoreEmptyStateExternalProps {
  title: string
  description: string
  icon: IAltIcon | undefined
  size: Extract<TAltSizes, 'small' | 'medium'> | undefined
}

export const createCoreEmptyStateExternalProps = (): IAltCoreEmptyStateExternalProps => {
  return {
    title: '',
    description: '',
    icon: altMagic,
    size: EAltSizes.SMALL,
  }
}

