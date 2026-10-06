import {
  createCoreGlobalProviderProps,
  type IYCoreGlobalProviderProps,
} from '~core/ui/globalProvider/models/types'

import type { TDefinedVueProps } from '~vue/utils/utility-types'
import { type GlobalProviderReadyEvent } from '~core/ui/globalProvider/models/types'

export interface IYVueCoreGlobalProviderProps extends IYCoreGlobalProviderProps {}

export interface IYVueGlobalProviderProps {
  plugins?: IYVueCoreGlobalProviderProps['plugins']
}

export const createVueGlobalProviderProps = (): TDefinedVueProps<IYVueGlobalProviderProps> => {
  const { plugins } = createCoreGlobalProviderProps()
  return { plugins: plugins ? () => plugins : undefined }
}

export interface IYVueGlobalProviderEmits {
  (event: 'ready', payload: GlobalProviderReadyEvent): void
}
