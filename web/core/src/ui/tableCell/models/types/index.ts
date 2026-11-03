import {
  createCoreTableCellExternalProps,
  type IAltCoreTableCellExternalProps,
} from './external'
import {
  createCoreTableCellInternalProps,
  type IAltCoreTableCellInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreTableCellProps extends IAltCoreTableCellExternalProps, IAltCoreTableCellInternalProps {}

export const createCoreTableCellProps = (): IAltCoreTableCellProps => ({
  ...createCoreTableCellExternalProps(),
  ...createCoreTableCellInternalProps(),
})
