import {
  createCoreTipExternalProps,
  type IAltCoreTipExternalProps,
} from './external'
import {
  createCoreTipInternalProps,
  type IAltCoreTipInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreTipProps extends IAltCoreTipExternalProps, IAltCoreTipInternalProps {}

export const createCoreTipProps = (): IAltCoreTipProps => ({
  ...createCoreTipExternalProps(),
  ...createCoreTipInternalProps(),
})
