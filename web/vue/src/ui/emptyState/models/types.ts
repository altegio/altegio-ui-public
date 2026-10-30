import {
  createCoreEmptyStateExternalProps,
  type IAltCoreEmptyStateExternalProps,
} from '~core/ui/emptyState/models/types/external'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreEmptyStateProps extends IAltCoreEmptyStateExternalProps {
}

export interface IAltVueEmptyStateProps {
  title?: IAltVueCoreEmptyStateProps['title']
  description?: IAltVueCoreEmptyStateProps['description']
  icon?: IAltVueCoreEmptyStateProps['icon']
  size?: IAltVueCoreEmptyStateProps['size']
}

export const createVueEmptyStateProps = (): TDefinedVueProps<IAltVueEmptyStateProps> => {
  const {
    title,
    description,
    size,
    icon,
  } = createCoreEmptyStateExternalProps()

  return {
    title,
    description,
    size: size,
    icon: icon ? () => icon : undefined,
  }
}
