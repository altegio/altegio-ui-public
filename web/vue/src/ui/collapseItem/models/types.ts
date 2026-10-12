import {
  createCoreCollapseItemProps,
  type IYCoreCollapseItemProps,
  type CollapseItemClickEvent,
} from '~core/ui/collapseItem/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreCollapseItemProps extends IYCoreCollapseItemProps {}

export interface IYVueCollapseItemProps {
  label?: IYVueCoreCollapseItemProps['label']
  annotation?: IYVueCoreCollapseItemProps['annotation']
  opened?: IYVueCoreCollapseItemProps['opened']
  loading?: IYVueCoreCollapseItemProps['loading']
  shallow?: IYVueCoreCollapseItemProps['shallow']
  value?: IYVueCoreCollapseItemProps['value']
  variant?: IYVueCoreCollapseItemProps['variant']
}

export const createVueCollapseItemProps = (): TDefinedVueProps<IYVueCollapseItemProps> => {
  const { label, annotation, opened, value, variant, loading, shallow } = createCoreCollapseItemProps()
  return {
    label,
    annotation,
    opened,
    loading,
    shallow,
    value,
    variant,
  }
}

export interface IYVueCollapseItemEmits {
  (event: 'collapse-item-click', payload: CollapseItemClickEvent): void
}
