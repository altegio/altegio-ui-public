import {
  createCoreDatePickerExternalProps,
  type IYCoreDatePickerExternalProps,
} from './external'


export * from './external'
export * from './events'

export interface IYCoreDatePickerProps extends IYCoreDatePickerExternalProps {}

export const createCoreDatePickerProps = (): IYCoreDatePickerProps => ({ ...createCoreDatePickerExternalProps() })
