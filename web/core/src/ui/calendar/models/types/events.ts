import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IAltCoreCalendarExternalProps } from './external'

export interface IAltCoreCalendarSelectEvent {
  value: IAltCoreCalendarExternalProps['date']
}

export interface IAltCoreCalendarRangeStartEvent {
  value: Extract<IAltCoreCalendarExternalProps['date'], string>
}

export interface IAltCoreCalendarRangeEndEvent {
  value: Extract<IAltCoreCalendarExternalProps['date'], string>
}

export class SelectEvent extends CustomEvent<IAltCoreCalendarSelectEvent> {}
export class RangeStartEvent extends CustomEvent<IAltCoreCalendarRangeStartEvent> {}
export class RangeEndEvent extends CustomEvent<IAltCoreCalendarRangeEndEvent> {}

export type TAltCoreCalendarEvents = TEventsStoryArgs<{ SelectEvent: typeof SelectEvent; RangeStartEvent: typeof RangeStartEvent; RangeEndEvent: typeof RangeEndEvent }>
