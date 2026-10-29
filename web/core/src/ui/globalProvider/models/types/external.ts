import type { IGlobalProviderPlugin } from '../../plugins'

export interface IYCoreGlobalProviderExternalProps {

  /**
   * Global provider plugins
   */
  plugins?: IGlobalProviderPlugin[]
}

export const createCoreGlobalProviderExternalProps = (): IYCoreGlobalProviderExternalProps => ({ plugins: undefined })
