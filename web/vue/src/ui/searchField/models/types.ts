import {
  createCoreSearchFieldExternalProps,
  type IYCoreSearchFieldExternalProps,
  type IYCoreTextFieldExternalProps,
  type InputEvent,
  type BlurEvent,
  type FocusEvent,
  type ClearEvent,
} from '~core/ui/textField/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export { SEARCH_FIELD_ICON } from '~core/ui/textField/models/types'

export interface IYVueCoreSearchFieldProps extends IYCoreSearchFieldExternalProps {
  modelValue: IYCoreTextFieldExternalProps['value']
}

export interface IYVueSearchFieldProps {
  modelValue?: IYCoreTextFieldExternalProps['value']
  name?: IYCoreSearchFieldExternalProps['name']
  placeholder?: IYCoreSearchFieldExternalProps['placeholder']
  disabled?: IYCoreSearchFieldExternalProps['disabled']
  autofocus?: IYCoreSearchFieldExternalProps['autofocus']
  error?: IYCoreSearchFieldExternalProps['error']
  errors?: IYCoreSearchFieldExternalProps['errors']
  size?: IYCoreSearchFieldExternalProps['size']
  labelText?: IYCoreSearchFieldExternalProps['labelText']
  labelTooltipText?: IYCoreSearchFieldExternalProps['labelTooltipText']
  annotationText?: IYCoreSearchFieldExternalProps['annotationText']
  labelDebounce?: IYCoreSearchFieldExternalProps['labelDebounce']
  locator?: IYCoreSearchFieldExternalProps['locator']
  locatorLabel?: IYCoreSearchFieldExternalProps['locatorLabel']
  locatorError?: IYCoreSearchFieldExternalProps['locatorError']
  locatorClearIcon?: IYCoreSearchFieldExternalProps['locatorClearIcon']
}

export const createVueSearchFieldProps = (): TDefinedVueProps<IYVueSearchFieldProps> => {
  const {
    error,
    errors,
    annotationText,
    labelText,
    labelTooltipText,
    labelDebounce,
    autofocus,
    size,
    disabled,
    name,
    placeholder,
    locator,
    locatorLabel,
    locatorError,
    locatorClearIcon,
  } = createCoreSearchFieldExternalProps()

  return {
    modelValue: '',
    name,
    placeholder,
    disabled,
    autofocus,
    error,
    errors: errors ? () => errors : undefined,
    size,
    labelText,
    labelTooltipText,
    annotationText,
    labelDebounce,
    locator,
    locatorLabel,
    locatorError,
    locatorClearIcon,
  }
}

/**
 * Input value for the update:modelValue event
 * Matches detail.value of the core InputEvent
 */
export type TYSearchFieldEvent = InputEvent

/** SearchField blur event */
export type TYSearchBlurEvent = BlurEvent

/** SearchField focus event */
export type TYSearchFocusEvent = FocusEvent

/** Clear event */
export type TYSearchClearEvent = ClearEvent

/** Search icon click event */
export type TYSearchClickSearchIconEvent = Event

/**
 * Events emitted by YSearchField
 *
 * - update:modelValue: (value: string) => void
 * - blur: (event: BlurEvent) => void
 * - focus: (event: FocusEvent) => void
 * - clear: (event: ClearEvent) => void
 * - click-search-icon: (event: Event) => void
 */
export interface IYSearchFieldEmits {
  (event: 'update:modelValue', payload: InputEvent['detail']['value']): void
  (event: 'blur', payload: BlurEvent): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'clear', payload: ClearEvent): void
  (event: 'click-search-icon', payload: Event): void
}
