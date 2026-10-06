import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { InputEvent, KeydownEvent } from '~core/ui/fieldInput/models/types'
import type { BlurEvent, FocusEvent } from '~core/ui/fieldWrapper/models/types'

export class ChangedValueEvent extends CustomEvent<{ value: string }> {}

export type TYCoreCountFieldEvents = TEventsStoryArgs<{
  ChangedValueEvent: typeof ChangedValueEvent
  InputEvent: typeof InputEvent
  FocusEvent: typeof FocusEvent
  BlurEvent: typeof BlurEvent
  KeydownEvent: typeof KeydownEvent
}>
