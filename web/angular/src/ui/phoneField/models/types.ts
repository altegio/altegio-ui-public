import {
  type IYCorePhoneFieldProps,
  createCorePhoneFieldProps,
} from '~core/ui/phoneField/models/types'

export { BlurEvent as YNgPhoneFieldBlurEvent, FocusEvent as YNgPhoneFieldFocusEvent, SelectOptionEvent as YNgPhoneFieldSelectOptionEvent, PhoneFieldChangeEvent as YNgPhoneFieldChangeEvent } from '~core/ui/phoneField/models/types/events'
import type { TYCorePhoneFieldAutocompleteOption, TYCorePhoneFieldInfoWithMeta } from '~core/ui/phoneField/models/types/external'

export interface IYNgPhoneFieldProps extends IYCorePhoneFieldProps {}
export type TYNgPhoneFieldAutocompleteOption = TYCorePhoneFieldAutocompleteOption
export type TYNgPhoneFieldInfoWithMeta = TYCorePhoneFieldInfoWithMeta

export const createNgPhoneFieldProps = (): IYNgPhoneFieldProps => createCorePhoneFieldProps()
