import {
  createCorePaginationProps,
  type IYCorePaginationProps,
} from '~core/ui/pagination/models/types'

export interface IYNgPaginationProps extends IYCorePaginationProps {}

export const createNgPaginationProps = (): IYNgPaginationProps => createCorePaginationProps()
