import type { IAltBaseCustomEvent } from '~shared/types/global'
import type { InputEvent as FieldInputInputEvent } from '~core/ui/fieldInput/models/types'


export interface IAltVueCountFieldInputEvent extends IAltBaseCustomEvent {
  event: FieldInputInputEvent
  value: number
}
