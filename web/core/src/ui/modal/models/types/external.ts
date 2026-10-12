import { EYSizes, type TYSizes } from '~shared/types/global'

export enum EYCoreModalVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export interface IYCoreModalExternalProps {
  open: boolean | undefined
  size: Extract<TYSizes, 'small' | 'large'> | undefined
  variant: `${EYCoreModalVariant}` | undefined
  width: string | undefined
  hideOverlay: boolean | undefined
  preventEscape: boolean | undefined
  fullScreen: boolean | undefined
}

export const createCoreModalExternalProps = (): IYCoreModalExternalProps => {
  return {
    open: false,
    size: EYSizes.SMALL,
    variant: EYCoreModalVariant.PRIMARY,
    width: undefined,
    hideOverlay: false,
    preventEscape: false,
    fullScreen: false,
  }
}
