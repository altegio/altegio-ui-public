import {
  createCoreSearchTextHighlightedProps,
  type IAltCoreSearchTextHighlightedProps,
} from '~core/ui/searchTextHighlighted/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreSearchTextHighlightedProps extends IAltCoreSearchTextHighlightedProps {}

export interface IAltVueSearchTextHighlightedProps {
  text: IAltVueCoreSearchTextHighlightedProps['text']
  search: IAltVueCoreSearchTextHighlightedProps['search']
  variant?: IAltVueCoreSearchTextHighlightedProps['variant']
  ignoredSymbols?: IAltVueCoreSearchTextHighlightedProps['ignoredSymbols']
  caseSensitive?: IAltVueCoreSearchTextHighlightedProps['caseSensitive']
  stopHighlight?: IAltVueCoreSearchTextHighlightedProps['stopHighlight']
  size?: IAltVueCoreSearchTextHighlightedProps['size']
  highlightTextVariant?: IAltVueCoreSearchTextHighlightedProps['highlightTextVariant']
  highlightTextSize?: IAltVueCoreSearchTextHighlightedProps['highlightTextSize']
}

export const createVueSearchTextHighlightedProps = (): TDefinedVueProps<IAltVueSearchTextHighlightedProps> => {
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
