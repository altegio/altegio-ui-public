import {
  createCorePaginationProps,
  type IAltCorePaginationProps,
} from '~core/ui/pagination/models/types'

export interface IAltNgPaginationProps extends IAltCorePaginationProps {}

export const createNgPaginationProps = (): IAltNgPaginationProps => createCorePaginationProps()
