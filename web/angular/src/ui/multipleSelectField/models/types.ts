import {
  createCoreMultipleSelectFieldProps,
  type IYCoreMultipleSelectFieldProps,
} from '~core/ui/multipleSelectField/models/types'

export { FocusEvent as YNgMultipleSelectFieldFocusEvent, SelectEvent as YNgMultipleSelectFieldSelectEvent, InputEvent as YNgMultipleSelectFieldInputEvent } from '~core/ui/multipleSelectField/models/types/events'

export interface IYNgMultipleSelectFieldProps extends IYCoreMultipleSelectFieldProps {}

export const createNgMultipleSelectFieldProps = (): IYNgMultipleSelectFieldProps => createCoreMultipleSelectFieldProps()
