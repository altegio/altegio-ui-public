import { createCoreModalProps, type IYCoreModalProps } from '~core/ui/modal/models/types'

export {
  OpenEvent,
  CloseEvent,
  ClickCloseIconEvent,
  ClickOverlayEvent,
  ClickActivatorEvent,
  PressEscapeEvent,
} from '~core/ui/modal/models/types/events'

export interface IYNgModalProps extends IYCoreModalProps {}

export const createNgModalProps = (): IYNgModalProps => createCoreModalProps()
