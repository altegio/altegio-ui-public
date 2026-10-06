import type { DeepReadonly } from 'vue'
import type { FocusEvent, InputEvent, SelectEvent, BlurEvent } from '~core/ui/selectField/models/types'
import {
  createCoreSelectFieldProps,
  type IYCoreSelectFieldProps,
} from '~core/ui/selectField/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreSelectFieldProps extends Omit<IYCoreSelectFieldProps, 'value'> {
  modelValue: IYCoreSelectFieldProps['value'] | undefined
}

export interface IYVueSelectFieldProps {
  modelValue?: IYVueCoreSelectFieldProps['modelValue']
  filterCallback?: IYVueCoreSelectFieldProps['filterCallback']
  itemValue?: IYVueCoreSelectFieldProps['itemValue']
  items?: IYVueCoreSelectFieldProps['items'] | DeepReadonly<IYVueCoreSelectFieldProps['items']> | Readonly<IYVueCoreSelectFieldProps['items']>
  isCustomFilter?: IYVueCoreSelectFieldProps['isCustomFilter']
  isFilterable?: IYVueCoreSelectFieldProps['isFilterable']
  isMapOptions?: IYVueCoreSelectFieldProps['isMapOptions']
  name?: IYVueCoreSelectFieldProps['name']
  placeholder?: IYVueCoreSelectFieldProps['placeholder']
  disabled?: IYVueCoreSelectFieldProps['disabled']
  required?: IYVueCoreSelectFieldProps['required']
  readonly?: IYVueCoreSelectFieldProps['readonly']
  autofocus?: IYVueCoreSelectFieldProps['autofocus']
  error?: IYVueCoreSelectFieldProps['error']
  errors?: IYVueCoreSelectFieldProps['errors']
  size?: IYVueCoreSelectFieldProps['size']
  labelText?: IYVueCoreSelectFieldProps['labelText']
  labelTooltipText?: IYVueCoreSelectFieldProps['labelTooltipText']
  labelDebounce?: IYVueCoreSelectFieldProps['labelDebounce']
  annotationText?: IYVueCoreSelectFieldProps['annotationText']
  itemLabel?: IYVueCoreSelectFieldProps['itemLabel']
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const createVueSelectFieldProps = (): TDefinedVueProps<IYVueSelectFieldProps> => {
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

export interface IYVueSelectFieldEmits {
  (event: 'update:modelValue', payload: SelectEvent['detail']['value']): void
  (event: 'input', payload: InputEvent['detail']['value']): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'blur', payload: BlurEvent): void
}
