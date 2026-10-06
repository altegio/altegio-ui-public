import type { IGlobalProviderPlugin } from '../../plugins'

export interface IYCoreGlobalProviderExternalProps {

  /**
   * Плагины для глобального провайдера
   */
  plugins?: IGlobalProviderPlugin[]
}

export const createCoreGlobalProviderExternalProps = (): IYCoreGlobalProviderExternalProps => ({ plugins: undefined })
