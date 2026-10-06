import {
  createCoreTipExternalProps,
  type IYCoreTipExternalProps,
} from './external'
import {
  createCoreTipInternalProps,
  type IYCoreTipInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IYCoreTipProps extends IYCoreTipExternalProps, IYCoreTipInternalProps {}

export const createCoreTipProps = (): IYCoreTipProps => ({
  ...createCoreTipExternalProps(),
  ...createCoreTipInternalProps(),
})
