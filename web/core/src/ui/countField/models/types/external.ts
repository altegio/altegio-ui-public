import {
  createCoreTextFieldExternalProps,
  type IAltCoreTextFieldExternalProps,
} from '~core/ui/textField/models/types'
import { omit } from 'radash'

export interface IAltCoreCountFieldExternalProps extends Omit<IAltCoreTextFieldExternalProps, 'clearable' | 'type' | 'maxlength' | 'maskOptions'> {
  min: number | undefined
  max: number | undefined
}

export const createCoreCountFieldExternalProps = (): IAltCoreCountFieldExternalProps => ({
  ...omit(createCoreTextFieldExternalProps(), ['clearable', 'type', 'maxlength']),
  min: undefined,
  max: undefined,
})
