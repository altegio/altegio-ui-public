import {
  createCoreSearchFieldExternalProps,
  type IAltCoreSearchFieldExternalProps,
  type IAltCoreTextFieldExternalProps,
  type InputEvent,
  type BlurEvent,
  type FocusEvent,
  type ClearEvent,
} from '~core/ui/textField/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export { SEARCH_FIELD_ICON } from '~core/ui/textField/models/types'

export interface IAltVueCoreSearchFieldProps extends IAltCoreSearchFieldExternalProps {
  modelValue: IAltCoreTextFieldExternalProps['value']
}

export interface IAltVueSearchFieldProps {
  modelValue?: IAltCoreTextFieldExternalProps['value']
  name?: IAltCoreSearchFieldExternalProps['name']
  placeholder?: IAltCoreSearchFieldExternalProps['placeholder']
  disabled?: IAltCoreSearchFieldExternalProps['disabled']
  autofocus?: IAltCoreSearchFieldExternalProps['autofocus']
  error?: IAltCoreSearchFieldExternalProps['error']
  errors?: IAltCoreSearchFieldExternalProps['errors']
  size?: IAltCoreSearchFieldExternalProps['size']
  labelText?: IAltCoreSearchFieldExternalProps['labelText']
  labelTooltipText?: IAltCoreSearchFieldExternalProps['labelTooltipText']
  annotationText?: IAltCoreSearchFieldExternalProps['annotationText']
  labelDebounce?: IAltCoreSearchFieldExternalProps['labelDebounce']
  locator?: IAltCoreSearchFieldExternalProps['locator']
  locatorLabel?: IAltCoreSearchFieldExternalProps['locatorLabel']
  locatorError?: IAltCoreSearchFieldExternalProps['locatorError']
  locatorClearIcon?: IAltCoreSearchFieldExternalProps['locatorClearIcon']
}

export const createVueSearchFieldProps = (): TDefinedVueProps<IAltVueSearchFieldProps> => {
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
export type TAltSearchFieldEvent = InputEvent

/** SearchField blur event */
export type TAltSearchBlurEvent = BlurEvent

/** SearchField focus event */
export type TAltSearchFocusEvent = FocusEvent

/** Clear event */
export type TAltSearchClearEvent = ClearEvent

/** Search icon click event */
export type TAltSearchClickSearchIconEvent = Event

/**
 * Events emitted by AltSearchField
 *
 * - update:modelValue: (value: string) => void
 * - blur: (event: BlurEvent) => void
 * - focus: (event: FocusEvent) => void
 * - clear: (event: ClearEvent) => void
 * - click-search-icon: (event: Event) => void
 */
export interface IAltSearchFieldEmits {
  (event: 'update:modelValue', payload: InputEvent['detail']['value']): void
  (event: 'blur', payload: BlurEvent): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'clear', payload: ClearEvent): void
  (event: 'click-search-icon', payload: Event): void
}
