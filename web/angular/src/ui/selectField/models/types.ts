import {
  createCoreSelectFieldProps,
  type IYCoreSelectFieldProps,
} from '~core/ui/selectField/models/types'

export { FocusEvent as YNgSelectFieldFocusEvent, SelectEvent as YNgSelectFieldSelectEvent, InputEvent as YNgSelectFieldInputEvent, BlurEvent as YNgSelectFieldBlurEvent } from '~core/ui/selectField/models/types/events'

export interface IYNgSelectFieldProps extends IYCoreSelectFieldProps {}

export const createNgSelectFieldProps = (): IYNgSelectFieldProps => createCoreSelectFieldProps()
