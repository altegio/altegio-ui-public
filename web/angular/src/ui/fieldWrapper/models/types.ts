import {
  createCoreFieldWrapperProps,
  type IYCoreFieldWrapperProps,
} from '~core/ui/fieldWrapper/models/types'

export { ClickOutsideEvent, FocusEvent, BlurEvent, MouseEnterEvent, MouseLeaveEvent } from '~core/ui/fieldWrapper/models/types'

export interface IYNgFieldWrapperProps extends IYCoreFieldWrapperProps {}

export const createNgFieldWrapperProps = (): IYNgFieldWrapperProps => createCoreFieldWrapperProps()
