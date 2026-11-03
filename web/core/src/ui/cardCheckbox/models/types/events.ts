import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IAltSimpleCheckboxCheckedEvent } from '~core/ui/simpleCheckbox/models/types'

export interface IAltCoreCardCheckboxCheckedEvent
  extends IAltSimpleCheckboxCheckedEvent {
}

export class CoreCardCheckboxCheckedEvent extends CustomEvent<IAltCoreCardCheckboxCheckedEvent> {}

export type TAltCoreCardCheckboxEvents = TEventsStoryArgs<{
  CoreCardCheckboxCheckedEvent: typeof CoreCardCheckboxCheckedEvent
}>
