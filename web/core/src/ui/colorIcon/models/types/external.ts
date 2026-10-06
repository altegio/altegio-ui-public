import type { IYIcon } from '~shared/icons'

export enum EYCoreColorIconVariant {
  GREY = 'grey',
  RED = 'red',
  GREEN = 'green',
  YELLOWISH = 'yellowish',
  BLUE = 'blue',
  VIOLET = 'violet',
}

export type TYCoreColorIconVariant = `${EYCoreColorIconVariant}`

export const EYCoreColorIconSize = {
  X_24: '24',
  X_32: '32',
  X_40: '40',
  X_48: '48',
  X_64: '64',
} as const

type TYCoreColorIconSize = typeof EYCoreColorIconSize[keyof typeof EYCoreColorIconSize]

export interface IYCoreColorIconExternalProps {
  icon: IYIcon
  size: TYCoreColorIconSize | undefined
  variant: TYCoreColorIconVariant | undefined
  disabled: boolean | undefined
}

export const createCoreColorIconExternalProps = (): IYCoreColorIconExternalProps => ({
  icon: {
    name: 'none' as IYIcon['name'],
    data: 'none',
  },
  size: EYCoreColorIconSize.X_48,
  variant: EYCoreColorIconVariant.GREY,
  disabled: false,
})
