import {
  createCoreGlobalProviderProps,
  type IAltCoreGlobalProviderProps,
} from '~core/ui/globalProvider/models/types'

import type { TDefinedVueProps } from '~vue/utils/utility-types'
import { type GlobalProviderReadyEvent } from '~core/ui/globalProvider/models/types'

export interface IAltVueCoreGlobalProviderProps extends IAltCoreGlobalProviderProps {}

export interface IAltVueGlobalProviderProps {
  plugins?: IAltVueCoreGlobalProviderProps['plugins']
}

export const createVueGlobalProviderProps = (): TDefinedVueProps<IAltVueGlobalProviderProps> => {
  const { plugins } = createCoreGlobalProviderProps()
  return { plugins: plugins ? () => plugins : undefined }
}

export interface IAltVueGlobalProviderEmits {
  (event: 'ready', payload: GlobalProviderReadyEvent): void
}
