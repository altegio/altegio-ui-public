import {
  createCoreSearchTextHighlightedProps,
  type IYCoreSearchTextHighlightedProps,
} from '~core/ui/searchTextHighlighted/models/types'

export interface IYNgSearchTextHighlightedProps extends IYCoreSearchTextHighlightedProps {}

export const createNgSearchTextHighlightedProps = (): IYNgSearchTextHighlightedProps => createCoreSearchTextHighlightedProps()
