import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreCheckboxProps,
  type IYCoreCheckboxProps,
  type CheckboxCheckedEvent,
} from '~core/ui/checkbox/models/types'

export interface IYVueCoreCheckboxProps extends Omit<IYCoreCheckboxProps, 'checked'> {
  modelValue: IYCoreCheckboxProps['checked']
}

export interface IYVueCheckboxProps {
  modelValue: IYVueCoreCheckboxProps['modelValue']
  indeterminate?: IYVueCoreCheckboxProps['indeterminate']
  required?: IYVueCoreCheckboxProps['required']
  size?: IYVueCoreCheckboxProps['size']
  disabled?: IYVueCoreCheckboxProps['disabled']
  labelText?: IYVueCoreCheckboxProps['labelText']
  labelTooltipText?: IYVueCoreCheckboxProps['labelTooltipText']
  annotationText?: IYVueCoreCheckboxProps['annotationText']
  labelOverflowDebounce?: IYVueCoreCheckboxProps['labelOverflowDebounce']
  alignment?: IYVueCoreCheckboxProps['alignment']
  errors?: IYVueCoreCheckboxProps['errors']
  labelTooltipPlacement?: IYVueCoreCheckboxProps['labelTooltipPlacement']
}

export const createVueCheckboxProps = (): TDefinedVueProps<IYVueCheckboxProps> => {
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
  }
}

export interface IYVueCheckboxEmits {
  (event: 'update:modelValue', payload: CheckboxCheckedEvent['detail']['checked']): void
}
