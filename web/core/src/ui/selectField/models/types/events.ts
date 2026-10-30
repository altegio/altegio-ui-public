import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IAltCoreSelectFieldExternalProps, IAltCoreSelectListItem } from './external'
import type { IAltBaseCustomEvent } from '~shared/types/global'

import type { VisibleEvent } from '~core/ui/dropdown/models/types/events'
import type { FocusEvent, BlurEvent } from '~core/ui/fieldWrapper/models/types/events'
import type { InputEvent } from '~core/ui/fieldInput/models/types/events'

export { VisibleEvent } from '~core/ui/dropdown/models/types/events'
export { FocusEvent, BlurEvent } from '~core/ui/fieldWrapper/models/types/events'
export { InputEvent } from '~core/ui/fieldInput/models/types/events'

export interface IAltCoreSelectFieldEvents extends IAltBaseCustomEvent {
  value: IAltCoreSelectFieldExternalProps['value']
  item: IAltCoreSelectListItem
}

export class SelectEvent extends CustomEvent<IAltCoreSelectFieldEvents> {}


export type TAltCoreSelectFieldEvents = TEventsStoryArgs<{
  SelectEvent: typeof SelectEvent
  FocusEvent: typeof FocusEvent
  BlurEvent: typeof BlurEvent
  InputEvent: typeof InputEvent
  VisibleEvent: typeof VisibleEvent
}>


