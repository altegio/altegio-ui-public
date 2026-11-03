import {
  createCoreCalendarExternalProps,
  type IAltCoreCalendarExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IAltCoreCalendarProps extends IAltCoreCalendarExternalProps {}

export const createCoreCalendarProps = (): IAltCoreCalendarProps => ({ ...createCoreCalendarExternalProps() })
