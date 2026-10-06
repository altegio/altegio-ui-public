import {
  createCorePopoverExternalProps,
  type IYCorePopoverExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IYCorePopoverProps extends IYCorePopoverExternalProps {}

export const createCorePopoverProps = (): IYCorePopoverProps => ({ ...createCorePopoverExternalProps() })
