import type { TDefinedVueProps } from '~vue/utils/utility-types'
import type { IAltCorePaginationProps } from '~web/core/src/ui/pagination/models/types'
import { type ChangePageEvent, createCorePaginationProps } from '~web/core/src/ui/pagination/models/types'

export type TVuePaginationChangePageEvent = ChangePageEvent

export interface IAltVueCorePaginationProps extends IAltCorePaginationProps {}

export interface IAltVuePaginationProps {}

export const createVuePaginationProps = (): TDefinedVueProps<IAltVuePaginationProps> => {
  return createCorePaginationProps()
}


