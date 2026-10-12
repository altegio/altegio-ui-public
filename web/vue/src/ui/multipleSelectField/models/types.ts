import {
  createCoreMultipleSelectFieldProps,
  type FocusEvent,
  type InputEvent,
  type SelectEvent,
  type BlurEvent,
  type IYCoreMultipleSelectFieldProps,
} from '~core/ui/multipleSelectField/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export type TYVueCoreMultipleSelectFieldEvents = {
  FocusEvent: FocusEvent
  InputEvent: InputEvent
  SelectEvent: SelectEvent
  BlurEvent: BlurEvent
}

export interface IYVueCoreMultipleSelectFieldProps extends Omit<IYCoreMultipleSelectFieldProps, 'value'> {
  modelValue: IYCoreMultipleSelectFieldProps['value'] | undefined
}

export interface IYVueMultipleSelectFieldProps {
  modelValue?: IYVueCoreMultipleSelectFieldProps['modelValue']
  filterCallback?: IYVueCoreMultipleSelectFieldProps['filterCallback']
  itemValue?: IYVueCoreMultipleSelectFieldProps['itemValue']
  items?: IYVueCoreMultipleSelectFieldProps['items']
  isCustomFilter?: IYVueCoreMultipleSelectFieldProps['isCustomFilter']
  isFilterable?: IYVueCoreMultipleSelectFieldProps['isFilterable']
  isMapOptions?: IYVueCoreMultipleSelectFieldProps['isMapOptions']
  name?: IYVueCoreMultipleSelectFieldProps['name']
  placeholder?: IYVueCoreMultipleSelectFieldProps['placeholder']
  disabled?: IYVueCoreMultipleSelectFieldProps['disabled']
  required?: IYVueCoreMultipleSelectFieldProps['required']
  readonly?: IYVueCoreMultipleSelectFieldProps['readonly']
  autofocus?: IYVueCoreMultipleSelectFieldProps['autofocus']
  errors?: IYVueCoreMultipleSelectFieldProps['errors']
  size?: IYVueCoreMultipleSelectFieldProps['size']
  labelText?: IYVueCoreMultipleSelectFieldProps['labelText']
  labelTooltipText?: IYVueCoreMultipleSelectFieldProps['labelTooltipText']
  labelDebounce?: IYVueCoreMultipleSelectFieldProps['labelDebounce']
  annotationText?: IYVueCoreMultipleSelectFieldProps['annotationText']
  itemLabel?: IYVueCoreMultipleSelectFieldProps['itemLabel']
  error?: IYVueCoreMultipleSelectFieldProps['error']
}

export interface IYVueMultipleSelectFieldEmits {
  (event: 'update:modelValue', payload: SelectEvent['detail']['value']): void
  (event: 'input', payload: InputEvent): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'blur', payload: BlurEvent): void
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const createVueMultipleSelectFieldProps = (): TDefinedVueProps<IYVueMultipleSelectFieldProps> => {
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

