import {
  createCoreBrandButtonExternalProps,
  type IAltCoreBrandButtonExternalProps,
} from './external'
import {
  createCoreBrandButtonInternalProps,
  type IAltCoreBrandButtonInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCoreBrandButtonProps extends IAltCoreBrandButtonExternalProps, IAltCoreBrandButtonInternalProps {}

export const createCoreBrandButtonProps = (): IAltCoreBrandButtonProps => ({
  ...createCoreBrandButtonExternalProps(),
  ...createCoreBrandButtonInternalProps(),
})
