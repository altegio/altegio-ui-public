import type {
  FocusEvent,
  BlurEvent,
  SelectOptionEvent,
  ChangeEvent,
  TYCoreAutocompleteFieldEvents,
  TYCoreAutocompleteFieldAutocompleteOption,
} from '~core/ui/autocompleteField/models/types'
import {
  createCoreAutocompleteFieldProps,
  type IYCoreAutocompleteFieldProps,
} from '~core/ui/autocompleteField/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreAutocompleteFieldProps extends
Omit<IYCoreAutocompleteFieldProps, 'emptyStateTitle' | 'emptyStateDescription'>,
Partial<Pick<IYCoreAutocompleteFieldProps, 'emptyStateTitle' | 'emptyStateDescription'>> {}

export type TYVueAutocompleteFieldEvents = TYCoreAutocompleteFieldEvents

export type TYVueAutocompleteFieldAutocompleteOption = TYCoreAutocompleteFieldAutocompleteOption

export type TYVueAutocompleteFieldFocusEvent = FocusEvent

export type TYVueAutocompleteFieldBlurEvent = BlurEvent

export type TYVueAutocompleteFieldSelectOptionEvent = SelectOptionEvent

export type TYVueAutocompleteFieldChangeEvent = ChangeEvent

export interface IYVueAutocompleteFieldProps {
  value: IYVueCoreAutocompleteFieldProps['value']
  name?: IYVueCoreAutocompleteFieldProps['name']
  disabled?: IYVueCoreAutocompleteFieldProps['disabled']
  required?: IYVueCoreAutocompleteFieldProps['required']
  readonly?: IYVueCoreAutocompleteFieldProps['readonly']
  autofocus?: IYVueCoreAutocompleteFieldProps['autofocus']
  error?: IYVueCoreAutocompleteFieldProps['error']
  errors?: IYVueCoreAutocompleteFieldProps['errors']
  size?: IYVueCoreAutocompleteFieldProps['size']
  placeholder?: IYVueCoreAutocompleteFieldProps['placeholder']
  labelText?: IYVueCoreAutocompleteFieldProps['labelText']
  labelTooltipText?: IYVueCoreAutocompleteFieldProps['labelTooltipText']
  labelDebounce?: IYVueCoreAutocompleteFieldProps['labelDebounce']
  annotationText?: IYVueCoreAutocompleteFieldProps['annotationText']
  minSearchLength?: IYVueCoreAutocompleteFieldProps['minSearchLength']
  searchFunction?: IYVueCoreAutocompleteFieldProps['searchFunction']
  disabledAutocomplete?: IYVueCoreAutocompleteFieldProps['disabledAutocomplete']
  emptyStateIcon?: IYVueCoreAutocompleteFieldProps['emptyStateIcon']
  emptyStateTitle?: IYVueCoreAutocompleteFieldProps['emptyStateTitle']
  emptyStateDescription?: IYVueCoreAutocompleteFieldProps['emptyStateDescription']
}

export interface IYVueAutocompleteFieldEmits {
  (event: 'blur', payload: BlurEvent): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'change', payload: ChangeEvent): void
  (event: 'selectOption', payload: SelectOptionEvent): void
}


export const createVueAutocompleteFieldProps = (): TDefinedVueProps<IYVueAutocompleteFieldProps> => {
  const {
    name,
    disabled,
    required,
    readonly,
    autofocus,
    error,
    errors,
    size,
    placeholder,
    labelText,
    labelTooltipText,
    labelDebounce,
    annotationText,
    minSearchLength,
    searchFunction,
    disabledAutocomplete,
    emptyStateIcon,
    emptyStateTitle,
    emptyStateDescription,
  } = createCoreAutocompleteFieldProps()

  return {
    name,
    disabled,
    required,
    readonly,
    autofocus,
    error,
    errors: errors ? () => errors : undefined,
    size,
    placeholder,
    labelText,
    labelTooltipText,
    labelDebounce,
    annotationText,
    minSearchLength,
    searchFunction: searchFunction ? () => searchFunction : undefined,
    disabledAutocomplete,
    emptyStateIcon: emptyStateIcon ? () => emptyStateIcon : undefined,
    emptyStateTitle,
    emptyStateDescription,
  }
}
