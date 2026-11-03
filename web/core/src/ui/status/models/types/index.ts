import {
  createCoreStatusExternalProps,
  type IAltCoreStatusExternalProps,
} from './external'
import {
  createCoreStatusInternalProps,
  type IAltCoreStatusInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreStatusProps extends IAltCoreStatusExternalProps, IAltCoreStatusInternalProps {}

export const createCoreStatusProps = (): IAltCoreStatusProps => ({
  ...createCoreStatusExternalProps(),
  ...createCoreStatusInternalProps(),
})
