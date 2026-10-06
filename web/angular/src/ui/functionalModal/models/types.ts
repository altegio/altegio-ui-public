import { createCoreFunctionalModalProps, type IYCoreFunctionalModalProps } from '~core/ui/functionalModal/models/types'

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

export interface IYNgFunctionalModalProps extends IYCoreFunctionalModalProps {}

export const createNgFunctionalModalProps = (): IYNgFunctionalModalProps => createCoreFunctionalModalProps()
