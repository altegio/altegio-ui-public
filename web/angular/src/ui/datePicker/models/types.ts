import {
  createCoreDatePickerProps,
  type IYCoreDatePickerProps,
} from '~core/ui/datePicker/models/types'

export { PickEvent } from '~core/ui/datePicker/models/types/events'

export interface IYNgDatePickerProps extends IYCoreDatePickerProps {}

export const createNgDatePickerProps = (): IYNgDatePickerProps => createCoreDatePickerProps()
