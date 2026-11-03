import type { IAltIcon } from '~shared/icons'

export enum EAltCoreColorIconVariant {
  GREY = 'grey',
  RED = 'red',
  GREEN = 'green',
  YELLOWISH = 'yellowish',
  BLUE = 'blue',
  VIOLET = 'violet',
}

export type TAltCoreColorIconVariant = `${EAltCoreColorIconVariant}`

export const EAltCoreColorIconSize = {
  X_24: '24',
  X_32: '32',
  X_40: '40',
  X_48: '48',
  X_64: '64',
} as const

type TAltCoreColorIconSize = typeof EAltCoreColorIconSize[keyof typeof EAltCoreColorIconSize]

export interface IAltCoreColorIconExternalProps {
  icon: IAltIcon
  size: TAltCoreColorIconSize | undefined
  variant: TAltCoreColorIconVariant | undefined
  disabled: boolean | undefined
}

export const createCoreColorIconExternalProps = (): IAltCoreColorIconExternalProps => ({
  icon: {
    name: 'none' as IAltIcon['name'],
    data: 'none',
  },
  size: EAltCoreColorIconSize.X_48,
  variant: EAltCoreColorIconVariant.GREY,
  disabled: false,
})
