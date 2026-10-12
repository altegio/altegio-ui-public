import {
  createCoreSearchTextHighlightedProps,
  type IYCoreSearchTextHighlightedProps,
} from '~core/ui/searchTextHighlighted/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreSearchTextHighlightedProps extends IYCoreSearchTextHighlightedProps {}

export interface IYVueSearchTextHighlightedProps {
  text: IYVueCoreSearchTextHighlightedProps['text']
  search: IYVueCoreSearchTextHighlightedProps['search']
  variant?: IYVueCoreSearchTextHighlightedProps['variant']
  ignoredSymbols?: IYVueCoreSearchTextHighlightedProps['ignoredSymbols']
  caseSensitive?: IYVueCoreSearchTextHighlightedProps['caseSensitive']
  stopHighlight?: IYVueCoreSearchTextHighlightedProps['stopHighlight']
  size?: IYVueCoreSearchTextHighlightedProps['size']
  highlightTextVariant?: IYVueCoreSearchTextHighlightedProps['highlightTextVariant']
  highlightTextSize?: IYVueCoreSearchTextHighlightedProps['highlightTextSize']
}

export const createVueSearchTextHighlightedProps = (): TDefinedVueProps<IYVueSearchTextHighlightedProps> => {
  const {
    variant,
    ignoredSymbols,
    caseSensitive,
    stopHighlight,
    size,
    highlightTextVariant,
    highlightTextSize,
  } = createCoreSearchTextHighlightedProps()

  return {
    variant,
    ignoredSymbols: ignoredSymbols ? () => ignoredSymbols : undefined,
    caseSensitive,
    stopHighlight,
    size,
    highlightTextVariant,
    highlightTextSize,
  }
}
