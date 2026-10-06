import { type IYIcon, yMagic } from '~shared/icons'
import type { TYSizes } from '~shared/types/global'
import { EYSizes } from '~shared/types/global'

export interface IYCoreEmptyStateExternalProps {
  title: string
  description: string
  icon: IYIcon | undefined
  size: Extract<TYSizes, 'small' | 'medium'> | undefined
}

export const createCoreEmptyStateExternalProps = (): IYCoreEmptyStateExternalProps => {
  return {
    title: '',
    description: '',
    icon: yMagic,
    size: EYSizes.SMALL,
  }
}

