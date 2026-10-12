import type {
  FocusEvent,
  BlurEvent,
  SelectOptionEvent,
  PhoneFieldChangeEvent,
  TYCorePhoneFieldEvents,
  TYCorePhoneFieldAutocompleteOption,
} from '~core/ui/phoneField/models/types'
import {
  createCorePhoneFieldProps,
  type IYCorePhoneFieldProps,
} from '~core/ui/phoneField/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCorePhoneFieldProps extends
Omit<IYCorePhoneFieldProps, 'emptyStateTitle' | 'emptyStateDescription'>,
Partial<Pick<IYCorePhoneFieldProps, 'emptyStateTitle' | 'emptyStateDescription'>> {}

export type TYVuePhoneFieldEvents = TYCorePhoneFieldEvents

export type TYVuePhoneFieldAutocompleteOption = TYCorePhoneFieldAutocompleteOption

export type TYVuePhoneFieldFocusEvent = FocusEvent

export type TYVuePhoneFieldBlurEvent = BlurEvent

export type TYVuePhoneFieldSelectOptionEvent = SelectOptionEvent

export type TYVuePhoneFieldChangeEvent = PhoneFieldChangeEvent

export interface IYVuePhoneFieldProps {
  value: IYVueCorePhoneFieldProps['value']
  name?: IYVueCorePhoneFieldProps['name']
  disabled?: IYVueCorePhoneFieldProps['disabled']
  required?: IYVueCorePhoneFieldProps['required']
  readonly?: IYVueCorePhoneFieldProps['readonly']
  autofocus?: IYVueCorePhoneFieldProps['autofocus']
  error?: IYVueCorePhoneFieldProps['error']
  errors?: IYVueCorePhoneFieldProps['errors']
  size?: IYVueCorePhoneFieldProps['size']
  placeholder?: IYVueCorePhoneFieldProps['placeholder']
  labelText?: IYVueCorePhoneFieldProps['labelText']
  labelTooltipText?: IYVueCorePhoneFieldProps['labelTooltipText']
  labelDebounce?: IYVueCorePhoneFieldProps['labelDebounce']
  annotationText?: IYVueCorePhoneFieldProps['annotationText']
  minSearchLength?: IYVueCorePhoneFieldProps['minSearchLength']
  withoutCodeSelection?: IYVueCorePhoneFieldProps['withoutCodeSelection']
  searchFunction?: IYVueCorePhoneFieldProps['searchFunction']
  disabledAutocomplete?: IYVueCorePhoneFieldProps['disabledAutocomplete']
  countries?: IYVueCorePhoneFieldProps['countries']
  defaultCountryId?: IYVueCorePhoneFieldProps['defaultCountryId']
  emptyStateIcon?: IYVueCorePhoneFieldProps['emptyStateIcon']
  emptyStateTitle?: IYVueCorePhoneFieldProps['emptyStateTitle']
  emptyStateDescription?: IYVueCorePhoneFieldProps['emptyStateDescription']
  optionPhonePrivacyEnabled?: IYVueCorePhoneFieldProps['optionPhonePrivacyEnabled']
}

export interface IYVuePhoneFieldEmits {
  (event: 'blur', payload: BlurEvent): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'change', payload: PhoneFieldChangeEvent): void
  (event: 'selectOption', payload: SelectOptionEvent): void
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const createVuePhoneFieldProps = (): TDefinedVueProps<IYVuePhoneFieldProps> => {
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
