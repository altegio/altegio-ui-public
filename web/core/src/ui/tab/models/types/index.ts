import { createCoreTabExternalProps, type IYCoreTabExternalProps } from '~core/ui/tab/models/types/external'
import { createCoreTabInternalProps, type IYCoreTabInternalProps } from '~core/ui/tab/models/types/internal'

export * from './external'
export * from './internal'

export interface IYCoreTabProps extends IYCoreTabExternalProps, IYCoreTabInternalProps {}

export const createCoreTabProps = (): IYCoreTabProps => ({
  ...createCoreTabExternalProps(),
  ...createCoreTabInternalProps(),
})
