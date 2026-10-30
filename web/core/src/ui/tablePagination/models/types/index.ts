import {
  createCoreTablePaginationExternalProps,
  type IAltCoreTablePaginationExternalProps,
} from './external'
import {
  createCoreTablePaginationInternalProps,
  type IAltCoreTablePaginationInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'
export * from '~core/ui/pagination/models/types/events'

export interface IAltCoreTablePaginationProps extends IAltCoreTablePaginationExternalProps, IAltCoreTablePaginationInternalProps {}

export const createCoreTablePaginationProps = (): IAltCoreTablePaginationProps => ({
  ...createCoreTablePaginationExternalProps(),
  ...createCoreTablePaginationInternalProps(),
})
