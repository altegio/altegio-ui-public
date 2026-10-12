import type { IYBaseCustomEvent } from '~shared/types/global'
import type { InputEvent as FieldInputInputEvent } from '~core/ui/fieldInput/models/types'


export interface IYVueCountFieldInputEvent extends IYBaseCustomEvent {
  event: FieldInputInputEvent
  value: number
}
