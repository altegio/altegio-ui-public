import {
  createCoreGlobalProviderExternalProps,
  type IYCoreGlobalProviderExternalProps,
} from './external'
import {
  createCoreGlobalProviderInternalProps,
  type IYCoreGlobalProviderInternalProps,
} from './internal'

export * from './events'
export * from './external'
export * from './internal'

export interface IYCoreGlobalProviderProps extends IYCoreGlobalProviderExternalProps, IYCoreGlobalProviderInternalProps {}

export const createCoreGlobalProviderProps = (): IYCoreGlobalProviderProps => ({
  ...createCoreGlobalProviderExternalProps(),
  ...createCoreGlobalProviderInternalProps(),
})
