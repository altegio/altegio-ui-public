import type { TDefinedVueProps } from '~vue/utils/utility-types'
import type { IYCorePaginationProps } from '~web/core/src/ui/pagination/models/types'
import { type ChangePageEvent, createCorePaginationProps } from '~web/core/src/ui/pagination/models/types'

export type TVuePaginationChangePageEvent = ChangePageEvent

export interface IYVueCorePaginationProps extends IYCorePaginationProps {}

export interface IYVuePaginationProps {}

export const createVuePaginationProps = (): TDefinedVueProps<IYVuePaginationProps> => {
  return createCorePaginationProps()
}


