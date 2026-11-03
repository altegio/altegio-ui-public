import {
  createCoreCollapseProps,
  type IAltCoreCollapseProps,
  type CollapseChangeEvent,
  type CollapseMoveEvent,
} from '~core/ui/collapse/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreCollapseProps extends Omit<IAltCoreCollapseProps, 'value'> {
  modelValue?: IAltCoreCollapseProps['value']
}

export interface IAltVueCollapseProps {
  modelValue?: IAltVueCoreCollapseProps['modelValue']
  type?: IAltVueCoreCollapseProps['type']
  variant?: IAltVueCoreCollapseProps['variant']
  draggable?: IAltVueCoreCollapseProps['draggable']
  allowCrossLevelMove?: IAltVueCoreCollapseProps['allowCrossLevelMove']
}

export const createVueCollapseProps = (): TDefinedVueProps<IAltVueCollapseProps> => {
  const { value: modelValue, type, variant, draggable, allowCrossLevelMove } = createCoreCollapseProps()
  return {
    modelValue: modelValue ? () => modelValue : '',
    type,
    variant,
    draggable,
    allowCrossLevelMove,
  }
}

export interface IAltVueCollapseEmits {
  (event: 'update:modelValue', payload: CollapseChangeEvent['detail']['value']): void
  (event: 'collapse-move', payload: CollapseMoveEvent): void
}
