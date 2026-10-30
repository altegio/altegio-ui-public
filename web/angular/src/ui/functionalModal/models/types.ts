import { createCoreFunctionalModalProps, type IAltCoreFunctionalModalProps } from '~core/ui/functionalModal/models/types'

export {
  OpenEvent,
  CloseEvent,
  ClickCloseIconEvent,
  ClickOverlayEvent,
  ClickActivatorEvent,
  PressEscapeEvent,
  CancelEvent,
  SubmitEvent,
} from '~core/ui/functionalModal/models/types/events'

export interface IAltNgFunctionalModalProps extends IAltCoreFunctionalModalProps {}

export const createNgFunctionalModalProps = (): IAltNgFunctionalModalProps => createCoreFunctionalModalProps()
