import {
  createCoreSearchTextHighlightedExternalProps,
  type IYCoreSearchTextHighlightedExternalProps,
} from './external'

export * from './external'

export interface IYCoreSearchTextHighlightedProps extends IYCoreSearchTextHighlightedExternalProps {}

export const createCoreSearchTextHighlightedProps = (): IYCoreSearchTextHighlightedProps => ({ ...createCoreSearchTextHighlightedExternalProps() })
