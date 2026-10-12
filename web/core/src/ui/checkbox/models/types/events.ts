import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IYCoreCheckboxCheckedEvent {
  checked: boolean
}

export class CheckboxCheckedEvent extends CustomEvent<IYCoreCheckboxCheckedEvent> {}

export type TYCoreCheckboxEvents = TEventsStoryArgs<{ CheckedEvent: typeof CheckboxCheckedEvent }>
