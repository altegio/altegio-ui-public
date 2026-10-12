import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IYCoreDropdownEvent {
  value: boolean
}

export class VisibleEvent extends CustomEvent<IYCoreDropdownEvent> {}
export class ClickOutsideEvent extends CustomEvent<IYCoreDropdownEvent> {}

export type TYCoreDropdownActionEvents = TEventsStoryArgs<{
  VisibleEvent: typeof VisibleEvent
  ClickOutsideEvent: typeof ClickOutsideEvent
}>
