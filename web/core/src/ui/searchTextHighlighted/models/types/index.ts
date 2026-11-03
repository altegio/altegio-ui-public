import {
  createCoreSearchTextHighlightedExternalProps,
  type IAltCoreSearchTextHighlightedExternalProps,
} from './external'

export * from './external'

export interface IAltCoreSearchTextHighlightedProps extends IAltCoreSearchTextHighlightedExternalProps {}

export const createCoreSearchTextHighlightedProps = (): IAltCoreSearchTextHighlightedProps => ({ ...createCoreSearchTextHighlightedExternalProps() })
