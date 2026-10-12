import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IYCoreSelectFieldExternalProps, IYCoreSelectListItem } from './external'
import type { IYBaseCustomEvent } from '~shared/types/global'

import type { VisibleEvent } from '~core/ui/dropdown/models/types/events'
import type { FocusEvent, BlurEvent } from '~core/ui/fieldWrapper/models/types/events'
import type { InputEvent } from '~core/ui/fieldInput/models/types/events'

export { VisibleEvent } from '~core/ui/dropdown/models/types/events'
export { FocusEvent, BlurEvent } from '~core/ui/fieldWrapper/models/types/events'
export { InputEvent } from '~core/ui/fieldInput/models/types/events'

export interface IYCoreSelectFieldEvents extends IYBaseCustomEvent {
  value: IYCoreSelectFieldExternalProps['value']
  item: IYCoreSelectListItem
}

export class SelectEvent extends CustomEvent<IYCoreSelectFieldEvents> {}


export type TYCoreSelectFieldEvents = TEventsStoryArgs<{
  SelectEvent: typeof SelectEvent
  FocusEvent: typeof FocusEvent
  BlurEvent: typeof BlurEvent
  InputEvent: typeof InputEvent
  VisibleEvent: typeof VisibleEvent
}>


