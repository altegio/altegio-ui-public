import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { TAltCorePhoneFieldAutocompleteOption, TAltCorePhoneFieldInfoWithMeta } from './external'

export class FocusEvent extends CustomEvent<null> {}

export class BlurEvent extends CustomEvent<null> {}

export class PhoneFieldChangeEvent extends CustomEvent<TAltCorePhoneFieldInfoWithMeta> {}

export class SelectOptionEvent extends CustomEvent<TAltCorePhoneFieldAutocompleteOption> {}

export type TAltCorePhoneFieldEvents = TEventsStoryArgs<{
  FocusEvent: typeof FocusEvent
  BlurEvent: typeof BlurEvent
  ChangeEvent: typeof PhoneFieldChangeEvent
  SelectOptionEvent: typeof SelectOptionEvent
}>


