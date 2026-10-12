import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IYSimpleRadioButtonCheckedEvent } from '~core/ui/simpleRadioButton/models/types'

export interface IYCoreCardRadioCheckedEvent
  extends IYSimpleRadioButtonCheckedEvent {
}

export class CoreCardRadioCheckedEvent extends CustomEvent<IYCoreCardRadioCheckedEvent> {}

export type TYCoreCardRadioEvents = TEventsStoryArgs<{
  CoreCardRadioCheckedEvent: typeof CoreCardRadioCheckedEvent
}>
