import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltCoreSimpleToggleCheckedEvent {
  checked: boolean
}

export class SimpleToggleCheckedEvent extends CustomEvent<IAltCoreSimpleToggleCheckedEvent> {}

export type TAltCoreSimpleToggleEvents = TEventsStoryArgs<{ CheckedEvent: typeof SimpleToggleCheckedEvent }>
