import { createCoreModalProps, type IAltCoreModalProps } from '~core/ui/modal/models/types'

export {
  OpenEvent,
  CloseEvent,
  ClickCloseIconEvent,
  ClickOverlayEvent,
  ClickActivatorEvent,
  PressEscapeEvent,
} from '~core/ui/modal/models/types/events'

export interface IAltNgModalProps extends IAltCoreModalProps {}

export const createNgModalProps = (): IAltNgModalProps => createCoreModalProps()
