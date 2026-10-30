import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { TAltCoreAutocompleteFieldAutocompleteOption, TAltCoreAutocompleteFieldInfo } from './external'

export class FocusEvent extends CustomEvent<null> {}

export class BlurEvent extends CustomEvent<null> {}

export class ChangeEvent extends CustomEvent<TAltCoreAutocompleteFieldInfo> {}

export class SelectOptionEvent extends CustomEvent<TAltCoreAutocompleteFieldAutocompleteOption> {}

export type TAltCoreAutocompleteFieldEvents = TEventsStoryArgs<{
  FocusEvent: typeof FocusEvent
  BlurEvent: typeof BlurEvent
  ChangeEvent: typeof ChangeEvent
  SelectOptionEvent: typeof SelectOptionEvent
}>


