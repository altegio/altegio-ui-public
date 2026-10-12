import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { TYCorePhoneFieldAutocompleteOption, TYCorePhoneFieldInfoWithMeta } from './external'

export class FocusEvent extends CustomEvent<null> {}

export class BlurEvent extends CustomEvent<null> {}

export class PhoneFieldChangeEvent extends CustomEvent<TYCorePhoneFieldInfoWithMeta> {}

export class SelectOptionEvent extends CustomEvent<TYCorePhoneFieldAutocompleteOption> {}

export type TYCorePhoneFieldEvents = TEventsStoryArgs<{
  FocusEvent: typeof FocusEvent
  BlurEvent: typeof BlurEvent
  ChangeEvent: typeof PhoneFieldChangeEvent
  SelectOptionEvent: typeof SelectOptionEvent
}>


