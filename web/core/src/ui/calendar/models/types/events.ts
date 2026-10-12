import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IYCoreCalendarExternalProps } from './external'

export interface IYCoreCalendarSelectEvent {
  value: IYCoreCalendarExternalProps['date']
}

export interface IYCoreCalendarRangeStartEvent {
  value: Extract<IYCoreCalendarExternalProps['date'], string>
}

export interface IYCoreCalendarRangeEndEvent {
  value: Extract<IYCoreCalendarExternalProps['date'], string>
}

export class SelectEvent extends CustomEvent<IYCoreCalendarSelectEvent> {}
export class RangeStartEvent extends CustomEvent<IYCoreCalendarRangeStartEvent> {}
export class RangeEndEvent extends CustomEvent<IYCoreCalendarRangeEndEvent> {}

export type TYCoreCalendarEvents = TEventsStoryArgs<{ SelectEvent: typeof SelectEvent; RangeStartEvent: typeof RangeStartEvent; RangeEndEvent: typeof RangeEndEvent }>
