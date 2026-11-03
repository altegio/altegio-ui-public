import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  type ChangePageEvent,
  type IAltCorePaginationProps,
  createCorePaginationProps,
} from '~core/ui/pagination/models/types'

export type TVuePaginationChangePageEvent = ChangePageEvent

export interface IAltVueCorePaginationProps extends IAltCorePaginationProps {}

export interface IAltVuePaginationProps {
  page?: IAltVueCorePaginationProps['page']
  itemsPerPage?: IAltVueCorePaginationProps['itemsPerPage']
  total?: IAltVueCorePaginationProps['total']
  disabled?: IAltVueCorePaginationProps['disabled']
}

export interface IAltVuePaginationEmits {
  (event: 'change-page', payload: TVuePaginationChangePageEvent): void
  (event: 'update:page', payload: number): void
}

export const createVuePaginationProps = (): TDefinedVueProps<IAltVuePaginationProps> => {
  const { page, itemsPerPage, total, disabled } = createCorePaginationProps()

  return {
    page,
    itemsPerPage,
    total,
    disabled,
  }
}
