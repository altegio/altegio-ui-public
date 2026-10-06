import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { TYCoreAutocompleteFieldAutocompleteOption, TYCoreAutocompleteFieldInfo } from './external'

export class FocusEvent extends CustomEvent<null> {}

export class BlurEvent extends CustomEvent<null> {}

export class ChangeEvent extends CustomEvent<TYCoreAutocompleteFieldInfo> {}

export class SelectOptionEvent extends CustomEvent<TYCoreAutocompleteFieldAutocompleteOption> {}

export type TYCoreAutocompleteFieldEvents = TEventsStoryArgs<{
  FocusEvent: typeof FocusEvent
  BlurEvent: typeof BlurEvent
  ChangeEvent: typeof ChangeEvent
  SelectOptionEvent: typeof SelectOptionEvent
}>


