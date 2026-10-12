import {
  createCoreCalendarExternalProps,
  type IYCoreCalendarExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IYCoreCalendarProps extends IYCoreCalendarExternalProps {}

export const createCoreCalendarProps = (): IYCoreCalendarProps => ({ ...createCoreCalendarExternalProps() })
