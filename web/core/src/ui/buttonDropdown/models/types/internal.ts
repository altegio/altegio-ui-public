import type { IAltIcon } from '~shared/icons'

export interface IAltCoreButtonDropdownIconsSet {
  leftIcon: IAltIcon | undefined
  rightIcon: IAltIcon | undefined
}

export enum EAltCoreButtonDropdownIconTypes {
  LEFT = 'left',
  RIGHT = 'right',
}
