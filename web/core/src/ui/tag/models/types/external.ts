import type { IAltIcon } from '~shared/icons'
import { EAltSizes, type TAltSizes } from '~shared/types/global'

export type TAltCoreTagSize = Extract<TAltSizes, 'small' | 'medium' | 'large'>

export enum EAltCoreTagVariant {
  ACCENT = 'accent',
  MUTED = 'muted',
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFORMATION = 'information',
  DISCOVERY = 'discovery',
}

export type TAltCoreTagVariant = `${EAltCoreTagVariant}`

export interface IAltTagExternalProps {
  size: TAltCoreTagSize | undefined
  variant: TAltCoreTagVariant | undefined
  iconLeft: IAltIcon | undefined
  disabled: boolean | undefined
  locator: string | undefined
  locatorLabel: string | undefined
  locatorIcon: string | undefined
}

export const createCoreTagExternalProps = (): IAltTagExternalProps => ({
  size: EAltSizes.MEDIUM,
  variant: EAltCoreTagVariant.ACCENT,
  iconLeft: undefined,
  disabled: false,
  locator: undefined,
  locatorLabel: undefined,
  locatorIcon: undefined,
})
