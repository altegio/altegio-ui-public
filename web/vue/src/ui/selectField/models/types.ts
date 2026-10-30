import type { DeepReadonly } from 'vue'
import type { FocusEvent, InputEvent, SelectEvent, BlurEvent } from '~core/ui/selectField/models/types'
import {
  createCoreSelectFieldProps,
  type IAltCoreSelectFieldProps,
} from '~core/ui/selectField/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreSelectFieldProps extends Omit<IAltCoreSelectFieldProps, 'value'> {
  modelValue: IAltCoreSelectFieldProps['value'] | undefined
}

export interface IAltVueSelectFieldProps {
  modelValue?: IAltVueCoreSelectFieldProps['modelValue']
  filterCallback?: IAltVueCoreSelectFieldProps['filterCallback']
  itemValue?: IAltVueCoreSelectFieldProps['itemValue']
  items?: IAltVueCoreSelectFieldProps['items'] | DeepReadonly<IAltVueCoreSelectFieldProps['items']> | Readonly<IAltVueCoreSelectFieldProps['items']>
  isCustomFilter?: IAltVueCoreSelectFieldProps['isCustomFilter']
  isFilterable?: IAltVueCoreSelectFieldProps['isFilterable']
  isMapOptions?: IAltVueCoreSelectFieldProps['isMapOptions']
  name?: IAltVueCoreSelectFieldProps['name']
  placeholder?: IAltVueCoreSelectFieldProps['placeholder']
  disabled?: IAltVueCoreSelectFieldProps['disabled']
  required?: IAltVueCoreSelectFieldProps['required']
  readonly?: IAltVueCoreSelectFieldProps['readonly']
  autofocus?: IAltVueCoreSelectFieldProps['autofocus']
  error?: IAltVueCoreSelectFieldProps['error']
  errors?: IAltVueCoreSelectFieldProps['errors']
  size?: IAltVueCoreSelectFieldProps['size']
  labelText?: IAltVueCoreSelectFieldProps['labelText']
  labelTooltipText?: IAltVueCoreSelectFieldProps['labelTooltipText']
  labelDebounce?: IAltVueCoreSelectFieldProps['labelDebounce']
  annotationText?: IAltVueCoreSelectFieldProps['annotationText']
  itemLabel?: IAltVueCoreSelectFieldProps['itemLabel']
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const createVueSelectFieldProps = (): TDefinedVueProps<IAltVueSelectFieldProps> => {
  const {
    filterCallback,
    itemValue,
    items,
    isCustomFilter,
    isFilterable,
    isMapOptions,
    name,
    placeholder,
    disabled,
    required,
    readonly,
    autofocus,
    errors,
    size,
    labelText,
    labelTooltipText,
    labelDebounce,
    annotationText,
    itemLabel,
    value: modelValue,
    error,
  } = createCoreSelectFieldProps()

  return {
    filterCallback: filterCallback ? () => filterCallback : undefined,
    itemValue,
    items: items ? () => items : undefined,
    isCustomFilter,
    isFilterable,
    isMapOptions,
    name,
    placeholder,
    disabled,
    required,
    readonly,
    autofocus,
    errors: errors ? () => errors : undefined,
    size,
    labelText,
    labelTooltipText,
    labelDebounce,
    annotationText,
    itemLabel,
    modelValue: modelValue ? () => modelValue : undefined,
    error,
  }
}

export interface IAltVueSelectFieldEmits {
  (event: 'update:modelValue', payload: SelectEvent['detail']['value']): void
  (event: 'input', payload: InputEvent['detail']['value']): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'blur', payload: BlurEvent): void
}
