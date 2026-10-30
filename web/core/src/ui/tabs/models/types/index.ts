import { createCoreTabsExternalProps, type IAltCoreTabsExternalProps } from '~core/ui/tabs/models/types/external'
import { createCoreTabsInternalProps, type IAltCoreTabsInternalProps } from '~core/ui/tabs/models/types/internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCoreTabsProps extends IAltCoreTabsExternalProps, IAltCoreTabsInternalProps {}

export const createCoreTabsProps = (): IAltCoreTabsProps => ({
  ...createCoreTabsExternalProps(),
  ...createCoreTabsInternalProps(),
})
