import type { TDefinedVueProps } from '~vue/utils/utility-types'
import { createCoreToggleExternalProps, type IAltCoreToggleExternalProps } from '~core/ui/toggle/models/types'
import type { ToggleCheckedEvent } from '~core/ui/toggle/models/types'

export interface IAltVueCoreToggleProps extends Omit<IAltCoreToggleExternalProps, 'checked'> {
  modelValue: IAltCoreToggleExternalProps['checked']
}

export interface IAltVueToggleProps {
  modelValue: IAltVueCoreToggleProps['modelValue']
  disabled?: IAltVueCoreToggleProps['disabled']
  labelText?: IAltVueCoreToggleProps['labelText']
  labelTooltipText?: IAltVueCoreToggleProps['labelTooltipText']
  annotationText?: IAltVueCoreToggleProps['annotationText']
  labelOverflowDebounce?: IAltVueCoreToggleProps['labelOverflowDebounce']
  alignment?: IAltVueCoreToggleProps['alignment']
  size?: IAltVueCoreToggleProps['size']
}

export const createVueToggleProps = (): TDefinedVueProps<IAltVueToggleProps> => {
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

export interface IAltVueToggleEmits {
  (event: 'update:modelValue', payload: ToggleCheckedEvent['detail']['checked']): void
}
