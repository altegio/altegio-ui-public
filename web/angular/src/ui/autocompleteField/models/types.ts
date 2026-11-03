import {
  type IAltCoreAutocompleteFieldProps,
  createCoreAutocompleteFieldProps,
} from '~core/ui/autocompleteField/models/types'

export { BlurEvent as AutocompleteFieldBlurEvent, FocusEvent as AutocompleteFieldFocusEvent, SelectOptionEvent as AutocompleteFieldSelectOptionEvent, ChangeEvent as AutocompleteFieldChangeEvent } from '~core/ui/autocompleteField/models/types/events'
import type { TAltCoreAutocompleteFieldAutocompleteOption, TAltCoreAutocompleteFieldInfo } from '~core/ui/autocompleteField/models/types/external'

export interface IAltNgAutocompleteFieldProps extends Omit<IAltCoreAutocompleteFieldProps, 'readonly'> {}

export type TAltNgAutocompleteFieldAutocompleteOption = TAltCoreAutocompleteFieldAutocompleteOption
export type TAltNgAutocompleteFieldInfoWithMeta = TAltCoreAutocompleteFieldInfo

export const createNgAutocompleteFieldProps = (): IAltNgAutocompleteFieldProps => createCoreAutocompleteFieldProps()
