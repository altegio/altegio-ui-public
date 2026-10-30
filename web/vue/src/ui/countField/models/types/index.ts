import {
  DEFAULT_NUMBER_VALUE,
  createCoreCountFieldProps,
  type IAltCoreCountFieldProps,
} from '~core/ui/countField/models/types'

import type { KeydownEvent } from '~core/ui/fieldInput/models/types'
import type { IAltTextFieldEmits } from '~vue/ui/textField/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'
import type { IAltVueCountFieldInputEvent } from '~vue/ui/countField/models/types/events'

export interface IAltVueCoreCountFieldProps extends Omit<IAltCoreCountFieldProps, 'value'> {
  modelValue?: number
}

export interface IAltVueCountFieldProps {
  modelValue?: IAltVueCoreCountFieldProps['modelValue']
  max?: IAltVueCoreCountFieldProps['max']
  min?: IAltVueCoreCountFieldProps['min']
  disabled?: IAltVueCoreCountFieldProps['disabled']
  readonly?: IAltVueCoreCountFieldProps['readonly']
  error?: IAltVueCoreCountFieldProps['error']
  size?: IAltVueCoreCountFieldProps['size']
  name?: IAltVueCoreCountFieldProps['name']
  placeholder?: IAltVueCoreCountFieldProps['placeholder']
  required?: IAltVueCoreCountFieldProps['required']
  autofocus?: IAltVueCoreCountFieldProps['autofocus']
  labelText?: IAltVueCoreCountFieldProps['labelText']
  labelTooltipText?: IAltVueCoreCountFieldProps['labelTooltipText']
  labelDebounce?: IAltVueCoreCountFieldProps['labelDebounce']
  annotationText?: IAltVueCoreCountFieldProps['annotationText']
  errors?: IAltVueCoreCountFieldProps['errors']
}

export interface IAltVueCountFieldEmits extends IAltTextFieldEmits {
  (event: 'keydown', payload: KeydownEvent): void
  (event: 'input', payload: IAltVueCountFieldInputEvent): void
  (event: 'update:modelValue', payload: number): void
}

export const createVueCountFieldProps = (): TDefinedVueProps<IAltVueCountFieldProps> => {
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
