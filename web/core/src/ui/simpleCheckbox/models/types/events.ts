import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IYSimpleCheckboxCheckedEvent {
  checked: boolean
}

export class SimpleCheckboxCheckedEvent extends CustomEvent<IYSimpleCheckboxCheckedEvent> {}

export type TYCoreSimpleCheckboxEvents = TEventsStoryArgs<{ CheckedEvent: typeof SimpleCheckboxCheckedEvent }>
