import {
  createCoreGlobalProviderExternalProps,
  type IAltCoreGlobalProviderExternalProps,
} from './external'
import {
  createCoreGlobalProviderInternalProps,
  type IAltCoreGlobalProviderInternalProps,
} from './internal'

export * from './events'
export * from './external'
export * from './internal'

export interface IAltCoreGlobalProviderProps extends IAltCoreGlobalProviderExternalProps, IAltCoreGlobalProviderInternalProps {}

export const createCoreGlobalProviderProps = (): IAltCoreGlobalProviderProps => ({
  ...createCoreGlobalProviderExternalProps(),
  ...createCoreGlobalProviderInternalProps(),
})
