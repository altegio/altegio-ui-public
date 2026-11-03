import {
  createCoreButtonDropdownProps,
  ItemClickEvent as CoreButtonDropdownItemClickEvent,
  VisibleEvent as CoreButtonDropdownVisibleEvent,
} from '~core/ui/buttonDropdown/models/types'
import type { IAltCoreButtonDropdownProps } from '~core/ui/buttonDropdown/models/types'

export interface IAltNgButtonDropdownProps extends IAltCoreButtonDropdownProps {}

export class ItemClickEvent extends CoreButtonDropdownItemClickEvent {}
export class VisibleEvent extends CoreButtonDropdownVisibleEvent {}

export interface IAltNgButtonDropdownPropsEmits {
  'item-click': ItemClickEvent
  'change-visible': VisibleEvent
}

export const createNgButtonDropdownProps = (): IAltNgButtonDropdownProps => createCoreButtonDropdownProps()
