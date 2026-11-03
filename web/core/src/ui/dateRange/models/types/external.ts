import { omit } from 'radash'
import {
  createCoreDatePickerExternalProps,
  type IAltCoreDatePickerExternalProps,
} from '~core/ui/datePicker/models/types'

export interface IAltCoreDateRangeExternalProps extends Omit<IAltCoreDatePickerExternalProps, 'date' | 'isRange'> {
  from: string | undefined
  to: string | undefined
}

export const DATE_RANGE_PLACEHOLDER = 'DD.MM.YYYY - DD.MM.YYYY'

export const createCoreDateRangeExternalProps = (): IAltCoreDateRangeExternalProps => ({
  ...omit(createCoreDatePickerExternalProps(), ['date', 'isRange']),
  placeholder: DATE_RANGE_PLACEHOLDER,
  from: undefined,
  to: undefined,
})
