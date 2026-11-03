import { createCoreTabExternalProps, type IAltCoreTabExternalProps } from '~core/ui/tab/models/types/external'
import { createCoreTabInternalProps, type IAltCoreTabInternalProps } from '~core/ui/tab/models/types/internal'

export * from './external'
export * from './internal'

export interface IAltCoreTabProps extends IAltCoreTabExternalProps, IAltCoreTabInternalProps {}

export const createCoreTabProps = (): IAltCoreTabProps => ({
  ...createCoreTabExternalProps(),
  ...createCoreTabInternalProps(),
})
