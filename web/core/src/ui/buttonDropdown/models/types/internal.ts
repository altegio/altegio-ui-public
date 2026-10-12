import type { IYIcon } from '~shared/icons'

export interface IYCoreButtonDropdownIconsSet {
  leftIcon: IYIcon | undefined
  rightIcon: IYIcon | undefined
}

export enum EYCoreButtonDropdownIconTypes {
  LEFT = 'left',
  RIGHT = 'right',
}
