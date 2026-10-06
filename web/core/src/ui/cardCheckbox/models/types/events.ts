import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IYSimpleCheckboxCheckedEvent } from '~core/ui/simpleCheckbox/models/types'

export interface IYCoreCardCheckboxCheckedEvent
  extends IYSimpleCheckboxCheckedEvent {
}

export class CoreCardCheckboxCheckedEvent extends CustomEvent<IYCoreCardCheckboxCheckedEvent> {}

export type TYCoreCardCheckboxEvents = TEventsStoryArgs<{
  CoreCardCheckboxCheckedEvent: typeof CoreCardCheckboxCheckedEvent
}>
