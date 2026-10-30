import {
  createCoreDatePickerProps,
  type IAltCoreDatePickerProps,
} from '~core/ui/datePicker/models/types'

export { PickEvent } from '~core/ui/datePicker/models/types/events'

export interface IAltNgDatePickerProps extends IAltCoreDatePickerProps {}

export const createNgDatePickerProps = (): IAltNgDatePickerProps => createCoreDatePickerProps()
