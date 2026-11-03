import type {
  FocusEvent,
  BlurEvent,
  SelectOptionEvent,
  PhoneFieldChangeEvent,
  TAltCorePhoneFieldEvents,
  TAltCorePhoneFieldAutocompleteOption,
} from '~core/ui/phoneField/models/types'
import {
  createCorePhoneFieldProps,
  type IAltCorePhoneFieldProps,
} from '~core/ui/phoneField/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCorePhoneFieldProps extends
Omit<IAltCorePhoneFieldProps, 'emptyStateTitle' | 'emptyStateDescription'>,
Partial<Pick<IAltCorePhoneFieldProps, 'emptyStateTitle' | 'emptyStateDescription'>> {}

export type TAltVuePhoneFieldEvents = TAltCorePhoneFieldEvents

export type TAltVuePhoneFieldAutocompleteOption = TAltCorePhoneFieldAutocompleteOption

export type TAltVuePhoneFieldFocusEvent = FocusEvent

export type TAltVuePhoneFieldBlurEvent = BlurEvent

export type TAltVuePhoneFieldSelectOptionEvent = SelectOptionEvent

export type TAltVuePhoneFieldChangeEvent = PhoneFieldChangeEvent

export interface IAltVuePhoneFieldProps {
  value: IAltVueCorePhoneFieldProps['value']
  name?: IAltVueCorePhoneFieldProps['name']
  disabled?: IAltVueCorePhoneFieldProps['disabled']
  required?: IAltVueCorePhoneFieldProps['required']
  readonly?: IAltVueCorePhoneFieldProps['readonly']
  autofocus?: IAltVueCorePhoneFieldProps['autofocus']
  error?: IAltVueCorePhoneFieldProps['error']
  errors?: IAltVueCorePhoneFieldProps['errors']
  size?: IAltVueCorePhoneFieldProps['size']
  placeholder?: IAltVueCorePhoneFieldProps['placeholder']
  labelText?: IAltVueCorePhoneFieldProps['labelText']
  labelTooltipText?: IAltVueCorePhoneFieldProps['labelTooltipText']
  labelDebounce?: IAltVueCorePhoneFieldProps['labelDebounce']
  annotationText?: IAltVueCorePhoneFieldProps['annotationText']
  minSearchLength?: IAltVueCorePhoneFieldProps['minSearchLength']
  withoutCodeSelection?: IAltVueCorePhoneFieldProps['withoutCodeSelection']
  searchFunction?: IAltVueCorePhoneFieldProps['searchFunction']
  disabledAutocomplete?: IAltVueCorePhoneFieldProps['disabledAutocomplete']
  countries?: IAltVueCorePhoneFieldProps['countries']
  defaultCountryId?: IAltVueCorePhoneFieldProps['defaultCountryId']
  emptyStateIcon?: IAltVueCorePhoneFieldProps['emptyStateIcon']
  emptyStateTitle?: IAltVueCorePhoneFieldProps['emptyStateTitle']
  emptyStateDescription?: IAltVueCorePhoneFieldProps['emptyStateDescription']
  optionPhonePrivacyEnabled?: IAltVueCorePhoneFieldProps['optionPhonePrivacyEnabled']
}

export interface IAltVuePhoneFieldEmits {
  (event: 'blur', payload: BlurEvent): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'change', payload: PhoneFieldChangeEvent): void
  (event: 'selectOption', payload: SelectOptionEvent): void
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const createVuePhoneFieldProps = (): TDefinedVueProps<IAltVuePhoneFieldProps> => {
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
    withoutCodeSelection,
    searchFunction,
    disabledAutocomplete,
    countries,
    defaultCountryId,
    emptyStateIcon,
    emptyStateTitle,
    emptyStateDescription,
    optionPhonePrivacyEnabled,
  } = createCorePhoneFieldProps()

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
    withoutCodeSelection,
    searchFunction: searchFunction ? () => searchFunction : undefined,
    disabledAutocomplete,
    countries: countries ? () => countries : undefined,
    defaultCountryId,
    emptyStateIcon: emptyStateIcon ? () => emptyStateIcon : undefined,
    emptyStateTitle,
    emptyStateDescription,
    optionPhonePrivacyEnabled,
  }
}
