import {
  createCoreMultipleSelectFieldProps,
  type IAltCoreMultipleSelectFieldProps,
} from '~core/ui/multipleSelectField/models/types'

export { FocusEvent as AltNgMultipleSelectFieldFocusEvent, SelectEvent as AltNgMultipleSelectFieldSelectEvent, InputEvent as AltNgMultipleSelectFieldInputEvent } from '~core/ui/multipleSelectField/models/types/events'

export interface IAltNgMultipleSelectFieldProps extends IAltCoreMultipleSelectFieldProps {}

export const createNgMultipleSelectFieldProps = (): IAltNgMultipleSelectFieldProps => createCoreMultipleSelectFieldProps()
