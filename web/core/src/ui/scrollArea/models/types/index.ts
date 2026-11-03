import {
  createCoreScrollAreaExternalProps,
  type IAltCoreScrollAreaExternalProps,
} from './external'
import {
  createCoreScrollAreaInternalProps,
  type IAltCoreScrollAreaInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCoreScrollAreaProps extends IAltCoreScrollAreaExternalProps, IAltCoreScrollAreaInternalProps {}

export const createCoreScrollAreaProps = (): IAltCoreScrollAreaProps => ({
  ...createCoreScrollAreaExternalProps(),
  ...createCoreScrollAreaInternalProps(),
})
