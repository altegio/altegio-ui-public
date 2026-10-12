import {
  createCoreGlobalProviderProps,
  type IYCoreGlobalProviderProps,
} from '~core/ui/globalProvider/models/types'

export interface IYNgGlobalProviderProps extends IYCoreGlobalProviderProps {}

export const createNgGlobalProviderProps = (): IYNgGlobalProviderProps => createCoreGlobalProviderProps()
