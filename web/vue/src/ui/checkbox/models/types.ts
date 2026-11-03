import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreCheckboxProps,
  type IAltCoreCheckboxProps,
  type CheckboxCheckedEvent,
} from '~core/ui/checkbox/models/types'

export interface IAltVueCoreCheckboxProps extends Omit<IAltCoreCheckboxProps, 'checked'> {
  modelValue: IAltCoreCheckboxProps['checked']
}

export interface IAltVueCheckboxProps {
  modelValue: IAltVueCoreCheckboxProps['modelValue']
  indeterminate?: IAltVueCoreCheckboxProps['indeterminate']
  required?: IAltVueCoreCheckboxProps['required']
  size?: IAltVueCoreCheckboxProps['size']
  disabled?: IAltVueCoreCheckboxProps['disabled']
  labelText?: IAltVueCoreCheckboxProps['labelText']
  labelTooltipText?: IAltVueCoreCheckboxProps['labelTooltipText']
  annotationText?: IAltVueCoreCheckboxProps['annotationText']
  labelOverflowDebounce?: IAltVueCoreCheckboxProps['labelOverflowDebounce']
  alignment?: IAltVueCoreCheckboxProps['alignment']
  errors?: IAltVueCoreCheckboxProps['errors']
  labelTooltipPlacement?: IAltVueCoreCheckboxProps['labelTooltipPlacement']
  name?: IAltVueCoreCheckboxProps['name']
  value?: IAltVueCoreCheckboxProps['value']
  accessibleName?: IAltVueCoreCheckboxProps['accessibleName']
}

export const createVueCheckboxProps = (): TDefinedVueProps<IAltVueCheckboxProps> => {
  const {
    size,
    required,
    indeterminate,
    disabled,
    labelText,
    labelTooltipText,
    annotationText,
    labelOverflowDebounce,
    alignment,
    errors,
    labelTooltipPlacement,
    name,
    value,
    accessibleName,
  } = createCoreCheckboxProps()

  return {
    size,
    required,
    indeterminate,
    disabled,
    labelText,
    labelTooltipText,
    annotationText,
    labelOverflowDebounce,
    alignment,
    errors: errors
      ? () => errors
      : undefined,
    labelTooltipPlacement,
    name,
    value,
    accessibleName,
  }
}

export interface IAltVueCheckboxEmits {
  (event: 'update:modelValue', payload: CheckboxCheckedEvent['detail']['checked']): void
}
