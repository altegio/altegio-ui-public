import { omit } from 'radash'
import {
  createCoreTextFieldProps,
  type IAltCoreTextFieldExternalProps,
} from '~core/ui/textField/models/types'

export type { InputEvent, FocusEvent, BlurEvent, ClearEvent } from '~core/ui/textField/models/types'
export { LABEL_LOCATOR, ERROR_LOCATOR } from '~core/ui/textField/models/types'

export type TAltNgTextFieldModel = IAltCoreTextFieldExternalProps['value']

export interface IAltNgTextFieldProps extends Omit<IAltCoreTextFieldExternalProps, 'value'> {}

export const createNgTextFieldProps = (): IAltNgTextFieldProps => {
  return { ...omit(createCoreTextFieldProps(), ['value']) }
}

