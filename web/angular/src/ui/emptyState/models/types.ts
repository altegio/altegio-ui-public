import type {
  IYCoreEmptyStateExternalProps,
} from '~core/ui/emptyState/models/types/external'
import {
  createCoreEmptyStateExternalProps,
} from '~core/ui/emptyState/models/types/external'

export interface IYNgEmptyStateProps extends IYCoreEmptyStateExternalProps {}

export const createNgEmptyStateProps = (): IYNgEmptyStateProps => createCoreEmptyStateExternalProps()
