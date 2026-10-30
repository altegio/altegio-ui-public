import {
  createCoreGlobalProviderProps,
  type IAltCoreGlobalProviderProps,
} from '~core/ui/globalProvider/models/types'

export interface IAltNgGlobalProviderProps extends IAltCoreGlobalProviderProps {}

export const createNgGlobalProviderProps = (): IAltNgGlobalProviderProps => createCoreGlobalProviderProps()
