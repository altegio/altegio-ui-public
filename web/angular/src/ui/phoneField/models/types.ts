import {
  type IAltCorePhoneFieldProps,
  createCorePhoneFieldProps,
} from '~core/ui/phoneField/models/types'

export { BlurEvent as AltNgPhoneFieldBlurEvent, FocusEvent as AltNgPhoneFieldFocusEvent, SelectOptionEvent as AltNgPhoneFieldSelectOptionEvent, PhoneFieldChangeEvent as AltNgPhoneFieldChangeEvent } from '~core/ui/phoneField/models/types/events'
import type { TAltCorePhoneFieldAutocompleteOption, TAltCorePhoneFieldInfoWithMeta } from '~core/ui/phoneField/models/types/external'

export interface IAltNgPhoneFieldProps extends IAltCorePhoneFieldProps {}
export type TAltNgPhoneFieldAutocompleteOption = TAltCorePhoneFieldAutocompleteOption
export type TAltNgPhoneFieldInfoWithMeta = TAltCorePhoneFieldInfoWithMeta

export const createNgPhoneFieldProps = (): IAltNgPhoneFieldProps => createCorePhoneFieldProps()
