import { createCoreSimpleToggleInternalProps, createCoreSimpleToggleExternalProps } from '~core/ui/simpleToggle/models/types'
import type { IAltCoreSimpleToggleExternalProps, IAltCoreSimpleToggleInternalProps } from '~core/ui/simpleToggle/models/types'

export { SimpleToggleCheckedEvent } from '~core/ui/simpleToggle/models/types/events'

export interface IAltNgSimpleToggleProps extends IAltCoreSimpleToggleExternalProps, IAltCoreSimpleToggleInternalProps {}

export const createNgSimpleToggleProps = (): IAltNgSimpleToggleProps => {
  return {
    ...createCoreSimpleToggleExternalProps(),
    ...createCoreSimpleToggleInternalProps(),
  }
}

