import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IYCoreSimpleToggleCheckedEvent {
  checked: boolean
}

export class SimpleToggleCheckedEvent extends CustomEvent<IYCoreSimpleToggleCheckedEvent> {}

export type TYCoreSimpleToggleEvents = TEventsStoryArgs<{ CheckedEvent: typeof SimpleToggleCheckedEvent }>
