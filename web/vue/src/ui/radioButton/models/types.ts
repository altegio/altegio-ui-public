import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreRadioButtonExternalProps,
  type IYCoreRadioButtonExternalProps,
} from '~core/ui/radioButton/models/types'
import type { RadioButtonCheckedEvent } from '~core/ui/radioButton/models/types'

export interface IYVueCoreRadioButtonProps extends Omit<IYCoreRadioButtonExternalProps, 'checked' | 'value'> {
  modelValue: IYCoreRadioButtonExternalProps['value']
}

export interface IYVueRadioButtonProps {
  modelValue?: IYVueCoreRadioButtonProps['modelValue']
  name?: IYVueCoreRadioButtonProps['name']
  required?: IYVueCoreRadioButtonProps['required']
  size?: IYVueCoreRadioButtonProps['size']
  disabled?: IYVueCoreRadioButtonProps['disabled']
  labelText?: IYVueCoreRadioButtonProps['labelText']
  labelTooltipText?: IYVueCoreRadioButtonProps['labelTooltipText']
  annotationText?: IYVueCoreRadioButtonProps['annotationText']
  labelOverflowDebounce?: IYVueCoreRadioButtonProps['labelOverflowDebounce']
  alignment?: IYVueCoreRadioButtonProps['alignment']
  errors?: IYVueCoreRadioButtonProps['errors']
}

export const createVueRadioButtonProps = (): TDefinedVueProps<IYVueRadioButtonProps> => {
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

export interface IYVueRadioButtonEmits {
  (event: 'update:modelValue', payload: RadioButtonCheckedEvent['detail']['checked']): void
}
