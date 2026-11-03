import {
  createCoreTextExternalProps,
  type IAltCoreTextExternalProps,
} from '~core/ui/text/models/types'

export interface IAltCoreSearchTextHighlightedExternalProps extends Omit<IAltCoreTextExternalProps, 'ellipsis' | 'lineclamp' | 'locator'> {
  text: string
  search: string
  stopHighlight: boolean | undefined
  caseSensitive: boolean | undefined
  ignoredSymbols: string[] | undefined
  highlightTextSize: IAltCoreTextExternalProps['size']
  highlightTextVariant: IAltCoreTextExternalProps['variant']
}

export const createCoreSearchTextHighlightedExternalProps = (): IAltCoreSearchTextHighlightedExternalProps => {
  const coreTextProps = createCoreTextExternalProps()

  return {
    ...coreTextProps,
    text: '',
    search: '',
    stopHighlight: undefined,
    caseSensitive: true,
    ignoredSymbols: undefined,
    highlightTextSize: coreTextProps.size,
    highlightTextVariant: coreTextProps.variant,
  }
}
