import {
  createCoreTagExternalProps,
  type IAltTagExternalProps,
} from './external'
import {
  createCoreTagInternalProps,
  type IAltCoreTagInternalProps,
} from './internal'

export * from './external'
export * from './events'
export * from './internal'

export interface IAltCoreTagProps extends IAltTagExternalProps, IAltCoreTagInternalProps {}

export const createCoreTagProps = (): IAltCoreTagProps => ({
  ...createCoreTagExternalProps(),
  ...createCoreTagInternalProps(),
})
