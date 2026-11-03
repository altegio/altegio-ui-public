import {
  createCoreListProps,
  type IAltCoreListProps,
} from '~core/ui/list/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueListProps {
  separator?: IAltCoreListProps['separator']
}

export const createVueListProps = (): TDefinedVueProps<IAltVueListProps> => {
  const { separator } = createCoreListProps()

  return { separator }
}
