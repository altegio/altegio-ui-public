import { createCoreTabsExternalProps, type IYCoreTabsExternalProps } from '~core/ui/tabs/models/types/external'
import { createCoreTabsInternalProps, type IYCoreTabsInternalProps } from '~core/ui/tabs/models/types/internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IYCoreTabsProps extends IYCoreTabsExternalProps, IYCoreTabsInternalProps {}

export const createCoreTabsProps = (): IYCoreTabsProps => ({
  ...createCoreTabsExternalProps(),
  ...createCoreTabsInternalProps(),
})
