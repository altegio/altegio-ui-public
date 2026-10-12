import { EYSizes, type TYSizes, type TAnchorTarget } from '~shared/types/global'


export enum EYCoreSimpleButtonVariant {
  PRIMARY = 'primary',
  OUTLINE = 'outline',
  OUTLINE_FILLED = 'outline-filled',
  TEXT = 'text',
}

export enum EYCoreSimpleButtonContentAlignment {
  START = 'start',
  CENTER = 'center',
  END = 'end',
}

export type TYCoreSimpleButtonVariant = `${EYCoreSimpleButtonVariant}`
export type TYCoreSimpleButtonContentAlignment = `${EYCoreSimpleButtonContentAlignment}`

export interface IYCoreSimpleButtonExternalProps {
  size: Extract<TYSizes, 'small' | 'medium' | 'large'> | undefined
  variant: TYCoreSimpleButtonVariant | undefined
  fullWidth: boolean | undefined
  disabled: boolean | undefined
  loading: boolean | undefined
  href: string | undefined
  target: TAnchorTarget | undefined
  alignment: TYCoreSimpleButtonContentAlignment | undefined
}

export const createCoreSimpleButtonExternalProps = (): IYCoreSimpleButtonExternalProps => {
  return {
    disabled: false,
    loading: false,
    size: EYSizes.SMALL,
    variant: EYCoreSimpleButtonVariant.PRIMARY,
    fullWidth: false,
    href: undefined,
    target: undefined,
    alignment: EYCoreSimpleButtonContentAlignment.CENTER,
  }
}
