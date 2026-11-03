import type { IGlobalProviderPlugin } from '../../plugins'

export interface IAltCoreGlobalProviderExternalProps {

  /**
   * Global provider plugins
   */
  plugins?: IGlobalProviderPlugin[]
}

export const createCoreGlobalProviderExternalProps = (): IAltCoreGlobalProviderExternalProps => ({ plugins: undefined })
