import {
  createCoreCollapseItemProps,
  type IAltCoreCollapseItemProps,
  type CollapseItemClickEvent,
} from '~core/ui/collapseItem/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreCollapseItemProps extends IAltCoreCollapseItemProps {}

export interface IAltVueCollapseItemProps {
  label?: IAltVueCoreCollapseItemProps['label']
  annotation?: IAltVueCoreCollapseItemProps['annotation']
  opened?: IAltVueCoreCollapseItemProps['opened']
  loading?: IAltVueCoreCollapseItemProps['loading']
  shallow?: IAltVueCoreCollapseItemProps['shallow']
  value?: IAltVueCoreCollapseItemProps['value']
  variant?: IAltVueCoreCollapseItemProps['variant']
}

export const createVueCollapseItemProps = (): TDefinedVueProps<IAltVueCollapseItemProps> => {
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

export interface IAltVueCollapseItemEmits {
  (event: 'collapse-item-click', payload: CollapseItemClickEvent): void
}
