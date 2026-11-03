import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltCoreToggleCheckedEvent {
  checked: boolean
}

export class ToggleCheckedEvent extends CustomEvent<IAltCoreToggleCheckedEvent> {}

export type TAltCoreToggleEvents = TEventsStoryArgs<{ CheckedEvent: typeof ToggleCheckedEvent }>
