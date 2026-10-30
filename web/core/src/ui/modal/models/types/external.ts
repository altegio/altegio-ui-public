import { EAltSizes, type TAltSizes } from '~shared/types/global'

export enum EAltCoreModalVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export interface IAltCoreModalExternalProps {
  open: boolean | undefined
  size: Extract<TAltSizes, 'small' | 'large'> | undefined
  variant: `${EAltCoreModalVariant}` | undefined
  width: string | undefined
  hideOverlay: boolean | undefined
  preventEscape: boolean | undefined
  fullScreen: boolean | undefined
  dialogLabel: string | undefined
}

export const createCoreModalExternalProps = (): IAltCoreModalExternalProps => {
  return {
    open: false,
    size: EAltSizes.SMALL,
    variant: EAltCoreModalVariant.PRIMARY,
    width: undefined,
    hideOverlay: false,
    preventEscape: false,
    fullScreen: false,
    dialogLabel: 'Dialog',
  }
}
