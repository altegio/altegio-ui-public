import {
  createCoreTextExternalProps,
  type IYCoreTextExternalProps,
} from '~core/ui/text/models/types'

export interface IYCoreSearchTextHighlightedExternalProps extends Omit<IYCoreTextExternalProps, 'ellipsis' | 'lineclamp' | 'locator'> {
  text: string
  search: string
  stopHighlight: boolean | undefined
  caseSensitive: boolean | undefined
  ignoredSymbols: string[] | undefined
  highlightTextSize: IYCoreTextExternalProps['size']
  highlightTextVariant: IYCoreTextExternalProps['variant']
}

export const createCoreSearchTextHighlightedExternalProps = (): IYCoreSearchTextHighlightedExternalProps => {
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
