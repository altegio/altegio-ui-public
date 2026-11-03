import {
  createCoreSelectFieldProps,
  type IAltCoreSelectFieldProps,
} from '~core/ui/selectField/models/types'

export { FocusEvent as AltNgSelectFieldFocusEvent, SelectEvent as AltNgSelectFieldSelectEvent, InputEvent as AltNgSelectFieldInputEvent, BlurEvent as AltNgSelectFieldBlurEvent } from '~core/ui/selectField/models/types/events'

export interface IAltNgSelectFieldProps extends IAltCoreSelectFieldProps {}

export const createNgSelectFieldProps = (): IAltNgSelectFieldProps => createCoreSelectFieldProps()
