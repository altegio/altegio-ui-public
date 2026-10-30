import type {
  FocusEvent,
  BlurEvent,
  SelectOptionEvent,
  ChangeEvent,
  TAltCoreAutocompleteFieldEvents,
  TAltCoreAutocompleteFieldAutocompleteOption,
} from '~core/ui/autocompleteField/models/types'
import {
  createCoreAutocompleteFieldProps,
  type IAltCoreAutocompleteFieldProps,
} from '~core/ui/autocompleteField/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreAutocompleteFieldProps extends
Omit<IAltCoreAutocompleteFieldProps, 'emptyStateTitle' | 'emptyStateDescription'>,
Partial<Pick<IAltCoreAutocompleteFieldProps, 'emptyStateTitle' | 'emptyStateDescription'>> {}

export type TAltVueAutocompleteFieldEvents = TAltCoreAutocompleteFieldEvents

export type TAltVueAutocompleteFieldAutocompleteOption = TAltCoreAutocompleteFieldAutocompleteOption

export type TAltVueAutocompleteFieldFocusEvent = FocusEvent

export type TAltVueAutocompleteFieldBlurEvent = BlurEvent

export type TAltVueAutocompleteFieldSelectOptionEvent = SelectOptionEvent

export type TAltVueAutocompleteFieldChangeEvent = ChangeEvent

export interface IAltVueAutocompleteFieldProps {
  value: IAltVueCoreAutocompleteFieldProps['value']
  name?: IAltVueCoreAutocompleteFieldProps['name']
  disabled?: IAltVueCoreAutocompleteFieldProps['disabled']
  required?: IAltVueCoreAutocompleteFieldProps['required']
  readonly?: IAltVueCoreAutocompleteFieldProps['readonly']
  autofocus?: IAltVueCoreAutocompleteFieldProps['autofocus']
  error?: IAltVueCoreAutocompleteFieldProps['error']
  errors?: IAltVueCoreAutocompleteFieldProps['errors']
  size?: IAltVueCoreAutocompleteFieldProps['size']
  placeholder?: IAltVueCoreAutocompleteFieldProps['placeholder']
  labelText?: IAltVueCoreAutocompleteFieldProps['labelText']
  labelTooltipText?: IAltVueCoreAutocompleteFieldProps['labelTooltipText']
  labelDebounce?: IAltVueCoreAutocompleteFieldProps['labelDebounce']
  annotationText?: IAltVueCoreAutocompleteFieldProps['annotationText']
  minSearchLength?: IAltVueCoreAutocompleteFieldProps['minSearchLength']
  searchFunction?: IAltVueCoreAutocompleteFieldProps['searchFunction']
  disabledAutocomplete?: IAltVueCoreAutocompleteFieldProps['disabledAutocomplete']
  emptyStateIcon?: IAltVueCoreAutocompleteFieldProps['emptyStateIcon']
  emptyStateTitle?: IAltVueCoreAutocompleteFieldProps['emptyStateTitle']
  emptyStateDescription?: IAltVueCoreAutocompleteFieldProps['emptyStateDescription']
}

export interface IAltVueAutocompleteFieldEmits {
  (event: 'blur', payload: BlurEvent): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'change', payload: ChangeEvent): void
  (event: 'selectOption', payload: SelectOptionEvent): void
}


export const createVueAutocompleteFieldProps = (): TDefinedVueProps<IAltVueAutocompleteFieldProps> => {
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
