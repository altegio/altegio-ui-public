import {
  createCoreTextFieldExternalProps,
  type IYCoreTextFieldExternalProps,
} from '~core/ui/textField/models/types'
import { omit } from 'radash'

export interface IYCoreCountFieldExternalProps extends Omit<IYCoreTextFieldExternalProps, 'clearable' | 'type' | 'maxlength' | 'maskOptions'> {
  min: number | undefined
  max: number | undefined
}

export const createCoreCountFieldExternalProps = (): IYCoreCountFieldExternalProps => ({
  ...omit(createCoreTextFieldExternalProps(), ['clearable', 'type', 'maxlength']),
  min: undefined,
  max: undefined,
})
