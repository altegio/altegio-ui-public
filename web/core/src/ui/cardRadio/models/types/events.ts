import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IAltSimpleRadioButtonCheckedEvent } from '~core/ui/simpleRadioButton/models/types'

export interface IAltCoreCardRadioCheckedEvent
  extends IAltSimpleRadioButtonCheckedEvent {
}

export class CoreCardRadioCheckedEvent extends CustomEvent<IAltCoreCardRadioCheckedEvent> {}

export type TAltCoreCardRadioEvents = TEventsStoryArgs<{
  CoreCardRadioCheckedEvent: typeof CoreCardRadioCheckedEvent
}>
