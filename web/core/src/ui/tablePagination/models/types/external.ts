import {
  createCorePaginationProps,
  type IAltCorePaginationProps,
} from '~core/ui/pagination/models/types'
import {
  type IAltCoreSelectFieldProps,
} from '~core/ui/selectField/models/types'

export interface IAltCoreTablePaginationExternalProps extends IAltCorePaginationProps, Pick<IAltCoreSelectFieldProps, 'itemValue' | 'itemLabel'> {
  optionsItemsPerPage: number[] | undefined
  counterText: string | undefined
}

export const createCoreTablePaginationExternalProps = (): IAltCoreTablePaginationExternalProps => ({
  ...createCorePaginationProps(),
  counterText: '',
  optionsItemsPerPage: [],
  itemValue: 'itemsPerPage',
  itemLabel: 'label',
})
