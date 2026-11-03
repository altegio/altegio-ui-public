import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltCoreCheckboxCheckedEvent {
  checked: boolean
}

export class CheckboxCheckedEvent extends CustomEvent<IAltCoreCheckboxCheckedEvent> {}

export type TAltCoreCheckboxEvents = TEventsStoryArgs<{ CheckedEvent: typeof CheckboxCheckedEvent }>
