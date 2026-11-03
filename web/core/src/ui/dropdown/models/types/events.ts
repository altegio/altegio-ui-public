import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltCoreDropdownEvent {
  value: boolean
}

export class VisibleEvent extends CustomEvent<IAltCoreDropdownEvent> {}
export class ClickOutsideEvent extends CustomEvent<IAltCoreDropdownEvent> {}

export type TAltCoreDropdownActionEvents = TEventsStoryArgs<{
  VisibleEvent: typeof VisibleEvent
  ClickOutsideEvent: typeof ClickOutsideEvent
}>
