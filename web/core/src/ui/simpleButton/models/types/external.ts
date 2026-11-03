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

export enum EAltCoreSimpleButtonType {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset',
}

export type TAltCoreSimpleButtonVariant = `${EAltCoreSimpleButtonVariant}`
export type TAltCoreSimpleButtonContentAlignment = `${EAltCoreSimpleButtonContentAlignment}`
export type TAltCoreSimpleButtonType = `${EAltCoreSimpleButtonType}`

export interface IAltCoreSimpleButtonExternalProps {
  size: Extract<TAltSizes, 'small' | 'medium' | 'large'> | undefined
  variant: TAltCoreSimpleButtonVariant | undefined
  fullWidth: boolean | undefined
  disabled: boolean | undefined
  loading: boolean | undefined
  href: string | undefined
  target: TAnchorTarget | undefined
  alignment: TAltCoreSimpleButtonContentAlignment | undefined

  /** What the button does in the `<form>` around it: nothing (`button`), submits it (`submit`) or resets it (`reset`) */
  type: TAltCoreSimpleButtonType | undefined

  /** Accessible name of the button; required when it shows only an icon */
  accessibleName: string | undefined
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
    type: EAltCoreSimpleButtonType.BUTTON,
    accessibleName: undefined,
  }
}
