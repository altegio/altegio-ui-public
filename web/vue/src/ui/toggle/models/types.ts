import type { TDefinedVueProps } from '~vue/utils/utility-types'
import { createCoreToggleExternalProps, type IYCoreToggleExternalProps } from '~core/ui/toggle/models/types'
import type { ToggleCheckedEvent } from '~core/ui/toggle/models/types'

export interface IYVueCoreToggleProps extends Omit<IYCoreToggleExternalProps, 'checked'> {
  modelValue: IYCoreToggleExternalProps['checked']
}

export interface IYVueToggleProps {
  modelValue: IYVueCoreToggleProps['modelValue']
  disabled?: IYVueCoreToggleProps['disabled']
  labelText?: IYVueCoreToggleProps['labelText']
  labelTooltipText?: IYVueCoreToggleProps['labelTooltipText']
  annotationText?: IYVueCoreToggleProps['annotationText']
  labelOverflowDebounce?: IYVueCoreToggleProps['labelOverflowDebounce']
  alignment?: IYVueCoreToggleProps['alignment']
  size?: IYVueCoreToggleProps['size']
}

export const createVueToggleProps = (): TDefinedVueProps<IYVueToggleProps> => {
  const { disabled, labelText, labelTooltipText, annotationText, labelOverflowDebounce, alignment, size } = createCoreToggleExternalProps()

  return {
    disabled,
    labelText,
    labelTooltipText,
    annotationText,
    labelOverflowDebounce,
    alignment,
    size,
  }
}

export interface IYVueToggleEmits {
  (event: 'update:modelValue', payload: ToggleCheckedEvent['detail']['checked']): void
}
