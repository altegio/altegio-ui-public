import {
  createCoreCollapseProps,
  type IYCoreCollapseProps,
  type CollapseChangeEvent,
  type CollapseMoveEvent,
} from '~core/ui/collapse/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreCollapseProps extends Omit<IYCoreCollapseProps, 'value'> {
  modelValue?: IYCoreCollapseProps['value']
}

export interface IYVueCollapseProps {
  modelValue?: IYVueCoreCollapseProps['modelValue']
  type?: IYVueCoreCollapseProps['type']
  variant?: IYVueCoreCollapseProps['variant']
  draggable?: IYVueCoreCollapseProps['draggable']
  allowCrossLevelMove?: IYVueCoreCollapseProps['allowCrossLevelMove']
}

export const createVueCollapseProps = (): TDefinedVueProps<IYVueCollapseProps> => {
  const { value: modelValue, type, variant, draggable, allowCrossLevelMove } = createCoreCollapseProps()
  return {
    modelValue: modelValue ? () => modelValue : '',
    type,
    variant,
    draggable,
    allowCrossLevelMove,
  }
}

export interface IYVueCollapseEmits {
  (event: 'update:modelValue', payload: CollapseChangeEvent['detail']['value']): void
  (event: 'collapse-move', payload: CollapseMoveEvent): void
}
