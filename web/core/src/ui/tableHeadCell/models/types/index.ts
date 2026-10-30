import {
  createCoreTableHeadCellExternalProps,
  type IAltCoreTableHeadCellExternalProps,
} from './external'
import {
  createCoreTableHeadCellInternalProps,
  type IAltCoreTableHeadCellInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCoreTableHeadCellProps extends IAltCoreTableHeadCellExternalProps, IAltCoreTableHeadCellInternalProps {}

export const createCoreTableHeadCellProps = (): IAltCoreTableHeadCellProps => ({
  ...createCoreTableHeadCellExternalProps(),
  ...createCoreTableHeadCellInternalProps(),
})
