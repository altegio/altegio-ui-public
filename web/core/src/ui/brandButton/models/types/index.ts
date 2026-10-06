import {
  createCoreBrandButtonExternalProps,
  type IYCoreBrandButtonExternalProps,
} from './external'
import {
  createCoreBrandButtonInternalProps,
  type IYCoreBrandButtonInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IYCoreBrandButtonProps extends IYCoreBrandButtonExternalProps, IYCoreBrandButtonInternalProps {}

export const createCoreBrandButtonProps = (): IYCoreBrandButtonProps => ({
  ...createCoreBrandButtonExternalProps(),
  ...createCoreBrandButtonInternalProps(),
})
