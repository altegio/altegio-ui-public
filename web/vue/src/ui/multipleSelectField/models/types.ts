import {
  createCoreMultipleSelectFieldProps,
  type FocusEvent,
  type InputEvent,
  type SelectEvent,
  type BlurEvent,
  type IAltCoreMultipleSelectFieldProps,
} from '~core/ui/multipleSelectField/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export type TAltVueCoreMultipleSelectFieldEvents = {
  FocusEvent: FocusEvent
  InputEvent: InputEvent
  SelectEvent: SelectEvent
  BlurEvent: BlurEvent
}

export interface IAltVueCoreMultipleSelectFieldProps extends Omit<IAltCoreMultipleSelectFieldProps, 'value'> {
  modelValue: IAltCoreMultipleSelectFieldProps['value'] | undefined
}

export interface IAltVueMultipleSelectFieldProps {
  modelValue?: IAltVueCoreMultipleSelectFieldProps['modelValue']
  filterCallback?: IAltVueCoreMultipleSelectFieldProps['filterCallback']
  itemValue?: IAltVueCoreMultipleSelectFieldProps['itemValue']
  items?: IAltVueCoreMultipleSelectFieldProps['items']
  isCustomFilter?: IAltVueCoreMultipleSelectFieldProps['isCustomFilter']
  isFilterable?: IAltVueCoreMultipleSelectFieldProps['isFilterable']
  isMapOptions?: IAltVueCoreMultipleSelectFieldProps['isMapOptions']
  name?: IAltVueCoreMultipleSelectFieldProps['name']
  placeholder?: IAltVueCoreMultipleSelectFieldProps['placeholder']
  disabled?: IAltVueCoreMultipleSelectFieldProps['disabled']
  required?: IAltVueCoreMultipleSelectFieldProps['required']
  readonly?: IAltVueCoreMultipleSelectFieldProps['readonly']
  autofocus?: IAltVueCoreMultipleSelectFieldProps['autofocus']
  errors?: IAltVueCoreMultipleSelectFieldProps['errors']
  size?: IAltVueCoreMultipleSelectFieldProps['size']
  labelText?: IAltVueCoreMultipleSelectFieldProps['labelText']
  labelTooltipText?: IAltVueCoreMultipleSelectFieldProps['labelTooltipText']
  labelDebounce?: IAltVueCoreMultipleSelectFieldProps['labelDebounce']
  annotationText?: IAltVueCoreMultipleSelectFieldProps['annotationText']
  itemLabel?: IAltVueCoreMultipleSelectFieldProps['itemLabel']
  error?: IAltVueCoreMultipleSelectFieldProps['error']
}

export interface IAltVueMultipleSelectFieldEmits {
  (event: 'update:modelValue', payload: SelectEvent['detail']['value']): void
  (event: 'input', payload: InputEvent): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'blur', payload: BlurEvent): void
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const createVueMultipleSelectFieldProps = (): TDefinedVueProps<IAltVueMultipleSelectFieldProps> => {
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
  } = createCoreMultipleSelectFieldProps()

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

