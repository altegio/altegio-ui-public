import type {
  IAltCoreEmptyStateExternalProps,
} from '~core/ui/emptyState/models/types/external'
import {
  createCoreEmptyStateExternalProps,
} from '~core/ui/emptyState/models/types/external'

export interface IAltNgEmptyStateProps extends IAltCoreEmptyStateExternalProps {}

export const createNgEmptyStateProps = (): IAltNgEmptyStateProps => createCoreEmptyStateExternalProps()
