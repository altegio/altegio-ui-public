import { omit } from 'radash'
import {
  createCoreTextFieldProps,
  type IYCoreTextFieldExternalProps,
} from '~core/ui/textField/models/types'

export type { InputEvent, FocusEvent, BlurEvent, ClearEvent } from '~core/ui/textField/models/types'
export { LABEL_LOCATOR, ERROR_LOCATOR } from '~core/ui/textField/models/types'

export type TYNgTextFieldModel = IYCoreTextFieldExternalProps['value']

export interface IYNgTextFieldProps extends Omit<IYCoreTextFieldExternalProps, 'value'> {}

export const createNgTextFieldProps = (): IYNgTextFieldProps => {
  return { ...omit(createCoreTextFieldProps(), ['value']) }
}

