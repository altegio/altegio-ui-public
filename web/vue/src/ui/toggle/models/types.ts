import type { TDefinedVueProps } from '~vue/utils/utility-types'
import { createCoreToggleExternalProps, type IAltCoreToggleExternalProps } from '~core/ui/toggle/models/types'
import type { ToggleCheckedEvent } from '~core/ui/toggle/models/types'

export interface IAltVueCoreToggleProps extends Omit<IAltCoreToggleExternalProps, 'checked'> {
  modelValue: IAltCoreToggleExternalProps['checked']
}

export interface IAltVueToggleProps {
  modelValue: IAltVueCoreToggleProps['modelValue']
  disabled?: IAltVueCoreToggleProps['disabled']
  required?: IAltVueCoreToggleProps['required']
  errors?: IAltVueCoreToggleProps['errors']
  labelText?: IAltVueCoreToggleProps['labelText']
  labelTooltipText?: IAltVueCoreToggleProps['labelTooltipText']
  annotationText?: IAltVueCoreToggleProps['annotationText']
  labelOverflowDebounce?: IAltVueCoreToggleProps['labelOverflowDebounce']
  alignment?: IAltVueCoreToggleProps['alignment']
  size?: IAltVueCoreToggleProps['size']
  name?: IAltVueCoreToggleProps['name']
  value?: IAltVueCoreToggleProps['value']
  accessibleName?: IAltVueCoreToggleProps['accessibleName']
}

export const createVueToggleProps = (): TDefinedVueProps<IAltVueToggleProps> => {
  const { disabled, required, errors, labelText, labelTooltipText, annotationText, labelOverflowDebounce, alignment, size, name, value, accessibleName } = createCoreToggleExternalProps()

  return {
    disabled,
    required,
    errors: errors
      ? () => errors
      : undefined,
    labelText,
    labelTooltipText,
    annotationText,
    labelOverflowDebounce,
    alignment,
    size,
    name,
    value,
    accessibleName,
  }
}

export interface IAltVueToggleEmits {
  (event: 'update:modelValue', payload: ToggleCheckedEvent['detail']['checked']): void
}
