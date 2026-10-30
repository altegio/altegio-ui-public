import {
  createCoreTableExternalProps,
  type IAltCoreTableExternalProps,
} from './external'
import {
  createCoreTableInternalProps,
  type IAltCoreTableInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreTableProps extends IAltCoreTableExternalProps, IAltCoreTableInternalProps {}

export const createCoreTableProps = (): IAltCoreTableProps => ({
  ...createCoreTableExternalProps(),
  ...createCoreTableInternalProps(),
})
