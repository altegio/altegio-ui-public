import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IYCoreTipVisibleEvent {
  value: boolean
}

export class VisibleEvent extends CustomEvent<IYCoreTipVisibleEvent> {}

export class ClickOutsideEvent extends CustomEvent<Event> {}

export type TYCoreTipActionEvents = TEventsStoryArgs<{ VisibleEvent: typeof VisibleEvent }>
