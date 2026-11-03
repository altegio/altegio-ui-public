import { createCoreSimpleToggleInternalProps, createCoreSimpleToggleExternalProps } from '~core/ui/simpleToggle/models/types'
import type { IAltCoreSimpleToggleExternalProps, IAltCoreSimpleToggleInternalProps } from '~core/ui/simpleToggle/models/types'

export { SimpleToggleCheckedEvent } from '~core/ui/simpleToggle/models/types/events'

// accessibleDescription is set by labelled core components only
export interface IAltNgSimpleToggleProps extends IAltCoreSimpleToggleExternalProps, Omit<IAltCoreSimpleToggleInternalProps, 'accessibleDescription'> {}

export const createNgSimpleToggleProps = (): IAltNgSimpleToggleProps => {
  return {
    ...createCoreSimpleToggleExternalProps(),
    ...createCoreSimpleToggleInternalProps(),
  }
}

