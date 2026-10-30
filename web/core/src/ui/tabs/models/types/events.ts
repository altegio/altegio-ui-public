import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltCoreTabsChangeActiveTabEvent {
  value: number
}

export class ChangeActiveTabEvent extends CustomEvent<IAltCoreTabsChangeActiveTabEvent> {}

export type TAltCoreTabsEvents = TEventsStoryArgs<{
  ChangeActiveTabEvent: typeof ChangeActiveTabEvent
}>
