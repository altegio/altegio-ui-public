import {
  DEFAULT_NUMBER_VALUE,
  createCoreCountFieldProps,
  type IYCoreCountFieldProps,
} from '~core/ui/countField/models/types'

import type { KeydownEvent } from '~core/ui/fieldInput/models/types'
import type { IYTextFieldEmits } from '~vue/ui/textField/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'
import type { IYVueCountFieldInputEvent } from '~vue/ui/countField/models/types/events'

export interface IYVueCoreCountFieldProps extends Omit<IYCoreCountFieldProps, 'value'> {
  modelValue?: number
}

export interface IYVueCountFieldProps {
  modelValue?: IYVueCoreCountFieldProps['modelValue']
  max?: IYVueCoreCountFieldProps['max']
  min?: IYVueCoreCountFieldProps['min']
  disabled?: IYVueCoreCountFieldProps['disabled']
  readonly?: IYVueCoreCountFieldProps['readonly']
  error?: IYVueCoreCountFieldProps['error']
  size?: IYVueCoreCountFieldProps['size']
  name?: IYVueCoreCountFieldProps['name']
  placeholder?: IYVueCoreCountFieldProps['placeholder']
  required?: IYVueCoreCountFieldProps['required']
  autofocus?: IYVueCoreCountFieldProps['autofocus']
  labelText?: IYVueCoreCountFieldProps['labelText']
  labelTooltipText?: IYVueCoreCountFieldProps['labelTooltipText']
  labelDebounce?: IYVueCoreCountFieldProps['labelDebounce']
  annotationText?: IYVueCoreCountFieldProps['annotationText']
  errors?: IYVueCoreCountFieldProps['errors']
}

export interface IYVueCountFieldEmits extends IYTextFieldEmits {
  (event: 'keydown', payload: KeydownEvent): void
  (event: 'input', payload: IYVueCountFieldInputEvent): void
  (event: 'update:modelValue', payload: number): void
}

export const createVueCountFieldProps = (): TDefinedVueProps<IYVueCountFieldProps> => {
  const {
    max,
    min,
    disabled,
    readonly,
    error,
    size,
    name,
    placeholder,
    required,
    autofocus,
    labelText,
    labelTooltipText,
    labelDebounce,
    annotationText,
    errors,
  } = createCoreCountFieldProps()

  return {
    modelValue: DEFAULT_NUMBER_VALUE,
    max,
    min,
    name,
    placeholder,
    required,
    autofocus,
    labelText,
    labelTooltipText,
    labelDebounce,
    annotationText,
    disabled,
    readonly,
    error,
    size,
    errors: errors
        ? () => errors
        : undefined,
  }
}
