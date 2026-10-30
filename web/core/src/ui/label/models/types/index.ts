import {
  createCoreLabelExternalProps,
  type IAltCoreLabelExternalProps,
} from './external'
import {
  createCoreLabelInternalProps,
  type IAltCoreLabelInternalProps,
} from './internal'

export * from './events'
export * from './external'
export * from './internal'

export interface IAltCoreLabelProps extends IAltCoreLabelExternalProps, IAltCoreLabelInternalProps {}

export const createCoreLabelProps = (): IAltCoreLabelProps => ({
  ...createCoreLabelExternalProps(),
  ...createCoreLabelInternalProps(),
})
