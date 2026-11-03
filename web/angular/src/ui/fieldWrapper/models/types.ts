import {
  createCoreFieldWrapperProps,
  type IAltCoreFieldWrapperProps,
} from '~core/ui/fieldWrapper/models/types'

export { ClickOutsideEvent, FocusEvent, BlurEvent, MouseEnterEvent, MouseLeaveEvent } from '~core/ui/fieldWrapper/models/types'

export interface IAltNgFieldWrapperProps extends IAltCoreFieldWrapperProps {}

export const createNgFieldWrapperProps = (): IAltNgFieldWrapperProps => createCoreFieldWrapperProps()
