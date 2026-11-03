import {
  createCoreSearchTextHighlightedProps,
  type IAltCoreSearchTextHighlightedProps,
} from '~core/ui/searchTextHighlighted/models/types'

export interface IAltNgSearchTextHighlightedProps extends IAltCoreSearchTextHighlightedProps {}

export const createNgSearchTextHighlightedProps = (): IAltNgSearchTextHighlightedProps => createCoreSearchTextHighlightedProps()
