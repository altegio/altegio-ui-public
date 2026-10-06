import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IYCoreToggleCheckedEvent {
  checked: boolean
}

export class ToggleCheckedEvent extends CustomEvent<IYCoreToggleCheckedEvent> {}

export type TYCoreToggleEvents = TEventsStoryArgs<{ CheckedEvent: typeof ToggleCheckedEvent }>
