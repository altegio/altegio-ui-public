import {
  createCorePaginationProps,
  type IYCorePaginationProps,
} from '~core/ui/pagination/models/types'
import {
  type IYCoreSelectFieldProps,
} from '~core/ui/selectField/models/types'

export interface IYCoreTablePaginationExternalProps extends IYCorePaginationProps, Pick<IYCoreSelectFieldProps, 'itemValue' | 'itemLabel'> {
  optionsItemsPerPage: number[] | undefined
  counterText: string | undefined
}

export const createCoreTablePaginationExternalProps = (): IYCoreTablePaginationExternalProps => ({
  ...createCorePaginationProps(),
  counterText: '',
  optionsItemsPerPage: [],
  itemValue: 'itemsPerPage',
  itemLabel: 'label',
})
