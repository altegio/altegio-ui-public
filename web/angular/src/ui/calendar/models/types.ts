import {
  createCoreCalendarProps,
  type IAltCoreCalendarProps,
  type IAltCoreCalendarSelectEvent,
} from '~core/ui/calendar/models/types'

export interface IAltNgCalendarProps extends IAltCoreCalendarProps {}
export type TAltNgCalendarEvents = IAltCoreCalendarSelectEvent
export { SelectEvent } from '~core/ui/calendar/models/types'

export const createNgCalendarProps = (): IAltNgCalendarProps => createCoreCalendarProps()
