import {
  createCoreButtonDropdownProps,
  ItemClickEvent as CoreButtonDropdownItemClickEvent,
  VisibleEvent as CoreButtonDropdownVisibleEvent,
} from '~core/ui/buttonDropdown/models/types'
import type { IYCoreButtonDropdownProps } from '~core/ui/buttonDropdown/models/types'

export interface IYNgButtonDropdownProps extends IYCoreButtonDropdownProps {}

export class ItemClickEvent extends CoreButtonDropdownItemClickEvent {}
export class VisibleEvent extends CoreButtonDropdownVisibleEvent {}

export interface IYNgButtonDropdownPropsEmits {
  'item-click': ItemClickEvent
  'change-visible': VisibleEvent
}

export const createNgButtonDropdownProps = (): IYNgButtonDropdownProps => createCoreButtonDropdownProps()
