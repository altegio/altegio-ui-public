import {
  createCoreLabelExternalProps,
  type IYCoreLabelExternalProps,
} from './external'
import {
  createCoreLabelInternalProps,
  type IYCoreLabelInternalProps,
} from './internal'

export * from './events'
export * from './external'
export * from './internal'

export interface IYCoreLabelProps extends IYCoreLabelExternalProps, IYCoreLabelInternalProps {}

export const createCoreLabelProps = (): IYCoreLabelProps => ({
  ...createCoreLabelExternalProps(),
  ...createCoreLabelInternalProps(),
})
