import { createCoreSimpleToggleInternalProps, createCoreSimpleToggleExternalProps } from '~core/ui/simpleToggle/models/types'
import type { IYCoreSimpleToggleExternalProps, IYCoreSimpleToggleInternalProps } from '~core/ui/simpleToggle/models/types'

export { SimpleToggleCheckedEvent } from '~core/ui/simpleToggle/models/types/events'

export interface IYNgSimpleToggleProps extends IYCoreSimpleToggleExternalProps, IYCoreSimpleToggleInternalProps {}

export const createNgSimpleToggleProps = (): IYNgSimpleToggleProps => {
  return {
    ...createCoreSimpleToggleExternalProps(),
    ...createCoreSimpleToggleInternalProps(),
  }
}

