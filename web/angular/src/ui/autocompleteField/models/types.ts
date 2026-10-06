import {
  type IYCoreAutocompleteFieldProps,
  createCoreAutocompleteFieldProps,
} from '~core/ui/autocompleteField/models/types'

export { BlurEvent as AutocompleteFieldBlurEvent, FocusEvent as AutocompleteFieldFocusEvent, SelectOptionEvent as AutocompleteFieldSelectOptionEvent, ChangeEvent as AutocompleteFieldChangeEvent } from '~core/ui/autocompleteField/models/types/events'
import type { TYCoreAutocompleteFieldAutocompleteOption, TYCoreAutocompleteFieldInfo } from '~core/ui/autocompleteField/models/types/external'

export interface IYNgAutocompleteFieldProps extends Omit<IYCoreAutocompleteFieldProps, 'readonly'> {}

export type TYNgAutocompleteFieldAutocompleteOption = TYCoreAutocompleteFieldAutocompleteOption
export type TYNgAutocompleteFieldInfoWithMeta = TYCoreAutocompleteFieldInfo

export const createNgAutocompleteFieldProps = (): IYNgAutocompleteFieldProps => createCoreAutocompleteFieldProps()
