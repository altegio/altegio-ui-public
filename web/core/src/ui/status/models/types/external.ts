import type { IAltIcon } from '~shared/icons'
import type { TAltSizes } from '~shared/types/global'

export enum EAltCoreStatusVariant {
  WAITING = 'waiting',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type TAltCoreStatusVariant = `${EAltCoreStatusVariant}`

export type TAltCoreStatusSize = Extract<TAltSizes, 'medium' | 'large'>

export interface IAltCoreStatusExternalProps {
  variant: TAltCoreStatusVariant | undefined
  text: string
  size: TAltCoreStatusSize | undefined
  icon: IAltIcon | undefined
}

export const createCoreStatusExternalProps = (): IAltCoreStatusExternalProps => ({
  variant: EAltCoreStatusVariant.WAITING,
  text: '',
  size: 'large',
  icon: undefined,
})
