import {
  createCoreCalendarProps,
  type IYCoreCalendarProps,
  type IYCoreCalendarSelectEvent,
} from '~core/ui/calendar/models/types'

export interface IYNgCalendarProps extends IYCoreCalendarProps {}
export type TYNgCalendarEvents = IYCoreCalendarSelectEvent
export { SelectEvent } from '~core/ui/calendar/models/types'

export const createNgCalendarProps = (): IYNgCalendarProps => createCoreCalendarProps()
