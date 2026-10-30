import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreRadioButtonExternalProps,
  type IAltCoreRadioButtonExternalProps,
} from '~core/ui/radioButton/models/types'
import type { RadioButtonCheckedEvent } from '~core/ui/radioButton/models/types'

export interface IAltVueCoreRadioButtonProps extends Omit<IAltCoreRadioButtonExternalProps, 'checked' | 'value'> {
  modelValue: IAltCoreRadioButtonExternalProps['value']
}

export interface IAltVueRadioButtonProps {
  modelValue?: IAltVueCoreRadioButtonProps['modelValue']
  name?: IAltVueCoreRadioButtonProps['name']
  required?: IAltVueCoreRadioButtonProps['required']
  size?: IAltVueCoreRadioButtonProps['size']
  disabled?: IAltVueCoreRadioButtonProps['disabled']
  labelText?: IAltVueCoreRadioButtonProps['labelText']
  labelTooltipText?: IAltVueCoreRadioButtonProps['labelTooltipText']
  annotationText?: IAltVueCoreRadioButtonProps['annotationText']
  labelOverflowDebounce?: IAltVueCoreRadioButtonProps['labelOverflowDebounce']
  alignment?: IAltVueCoreRadioButtonProps['alignment']
  errors?: IAltVueCoreRadioButtonProps['errors']
}

export const createVueRadioButtonProps = (): TDefinedVueProps<IAltVueRadioButtonProps> => {
  const {
    size,
    required,
    name,
    disabled,
    labelText,
    labelTooltipText,
    annotationText,
    labelOverflowDebounce,
    alignment,
    errors,
    value: modelValue,
  } = createCoreRadioButtonExternalProps()

  return {
    modelValue,
    size,
    required,
    name,
    disabled,
    labelText,
    labelTooltipText,
    annotationText,
    labelOverflowDebounce,
    alignment,
    errors: errors
      ? () => errors
      : undefined,
  }
}

export interface IAltVueRadioButtonEmits {
  (event: 'update:modelValue', payload: RadioButtonCheckedEvent['detail']['checked']): void
}
