import type { IYIcon } from '~shared/icons'
import { EYSizes, type TYSizes } from '~shared/types/global'

export type TYCoreTagSize = Extract<TYSizes, 'small' | 'medium' | 'large'>

export enum EYCoreTagVariant {
  ACCENT = 'accent',
  MUTED = 'muted',
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFORMATION = 'information',
  DISCOVERY = 'discovery',
}

export type TYCoreTagVariant = `${EYCoreTagVariant}`

export interface IYTagExternalProps {
  size: TYCoreTagSize | undefined
  variant: TYCoreTagVariant | undefined
  iconLeft: IYIcon | undefined
  disabled: boolean | undefined
  locator: string | undefined
  locatorLabel: string | undefined
  locatorIcon: string | undefined
}

export const createCoreTagExternalProps = (): IYTagExternalProps => ({
  size: EYSizes.MEDIUM,
  variant: EYCoreTagVariant.ACCENT,
  iconLeft: undefined,
  disabled: false,
  locator: undefined,
  locatorLabel: undefined,
  locatorIcon: undefined,
})
