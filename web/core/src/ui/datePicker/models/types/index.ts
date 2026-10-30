import {
  createCoreDatePickerExternalProps,
  type IAltCoreDatePickerExternalProps,
} from './external'


export * from './external'
export * from './events'

export interface IAltCoreDatePickerProps extends IAltCoreDatePickerExternalProps {}

export const createCoreDatePickerProps = (): IAltCoreDatePickerProps => ({ ...createCoreDatePickerExternalProps() })
