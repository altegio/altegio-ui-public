import {
  createCoreTablePaginationExternalProps,
  type IYCoreTablePaginationExternalProps,
} from './external'
import {
  createCoreTablePaginationInternalProps,
  type IYCoreTablePaginationInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'
export * from '~core/ui/pagination/models/types/events'

export interface IYCoreTablePaginationProps extends IYCoreTablePaginationExternalProps, IYCoreTablePaginationInternalProps {}

export const createCoreTablePaginationProps = (): IYCoreTablePaginationProps => ({
  ...createCoreTablePaginationExternalProps(),
  ...createCoreTablePaginationInternalProps(),
})
