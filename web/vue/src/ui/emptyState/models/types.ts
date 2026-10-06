import {
  createCoreEmptyStateExternalProps,
  type IYCoreEmptyStateExternalProps,
} from '~core/ui/emptyState/models/types/external'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreEmptyStateProps extends IYCoreEmptyStateExternalProps {
}

export interface IYVueEmptyStateProps {
  title?: IYVueCoreEmptyStateProps['title']
  description?: IYVueCoreEmptyStateProps['description']
  icon?: IYVueCoreEmptyStateProps['icon']
  size?: IYVueCoreEmptyStateProps['size']
}

export const createVueEmptyStateProps = (): TDefinedVueProps<IYVueEmptyStateProps> => {
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
