import { EAltSizes, type TAltSizes, type TAnchorTarget } from '~shared/types/global'


export enum EAltCoreSimpleButtonVariant {
  PRIMARY = 'primary',
  OUTLINE = 'outline',
  OUTLINE_FILLED = 'outline-filled',
  TEXT = 'text',
}

export enum EAltCoreSimpleButtonContentAlignment {
  START = 'start',
  CENTER = 'center',
  END = 'end',
}

export type TAltCoreSimpleButtonVariant = `${EAltCoreSimpleButtonVariant}`
export type TAltCoreSimpleButtonContentAlignment = `${EAltCoreSimpleButtonContentAlignment}`

export interface IAltCoreSimpleButtonExternalProps {
  size: Extract<TAltSizes, 'small' | 'medium' | 'large'> | undefined
  variant: TAltCoreSimpleButtonVariant | undefined
  fullWidth: boolean | undefined
  disabled: boolean | undefined
  loading: boolean | undefined
  href: string | undefined
  target: TAnchorTarget | undefined
  alignment: TAltCoreSimpleButtonContentAlignment | undefined
}

export const createCoreSimpleButtonExternalProps = (): IAltCoreSimpleButtonExternalProps => {
  return {
    disabled: false,
    loading: false,
    size: EAltSizes.SMALL,
    variant: EAltCoreSimpleButtonVariant.PRIMARY,
    fullWidth: false,
    href: undefined,
    target: undefined,
    alignment: EAltCoreSimpleButtonContentAlignment.CENTER,
  }
}
