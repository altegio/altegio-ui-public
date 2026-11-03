import {
  createCoreDateRangeExternalProps,
  type IAltCoreDateRangeExternalProps,
} from './external'
import {
  createCoreDateRangeInternalProps,
  type IAltCoreDateRangeInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCoreDateRangeProps extends IAltCoreDateRangeExternalProps, IAltCoreDateRangeInternalProps {}

export const createCoreDateRangeProps = (): IAltCoreDateRangeProps => ({
  ...createCoreDateRangeExternalProps(),
  ...createCoreDateRangeInternalProps(),
})
