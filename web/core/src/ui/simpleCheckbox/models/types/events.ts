import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltSimpleCheckboxCheckedEvent {
  checked: boolean
}

export class SimpleCheckboxCheckedEvent extends CustomEvent<IAltSimpleCheckboxCheckedEvent> {}

export type TAltCoreSimpleCheckboxEvents = TEventsStoryArgs<{ CheckedEvent: typeof SimpleCheckboxCheckedEvent }>
