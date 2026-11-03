import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltCoreTipVisibleEvent {
  value: boolean
}

export class VisibleEvent extends CustomEvent<IAltCoreTipVisibleEvent> {}

export class ClickOutsideEvent extends CustomEvent<Event> {}

export type TAltCoreTipActionEvents = TEventsStoryArgs<{ VisibleEvent: typeof VisibleEvent }>
