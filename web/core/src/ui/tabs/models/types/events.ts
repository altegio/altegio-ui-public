import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IYCoreTabsChangeActiveTabEvent {
  value: number
}

export class ChangeActiveTabEvent extends CustomEvent<IYCoreTabsChangeActiveTabEvent> {}

export type TYCoreTabsEvents = TEventsStoryArgs<{
  ChangeActiveTabEvent: typeof ChangeActiveTabEvent
}>
