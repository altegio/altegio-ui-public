import {
  createCorePopoverExternalProps,
  type IAltCorePopoverExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IAltCorePopoverProps extends IAltCorePopoverExternalProps {}

export const createCorePopoverProps = (): IAltCorePopoverProps => ({ ...createCorePopoverExternalProps() })
