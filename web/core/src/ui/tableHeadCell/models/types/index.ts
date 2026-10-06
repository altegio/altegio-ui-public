import {
  createCoreTableHeadCellExternalProps,
  type IYCoreTableHeadCellExternalProps,
} from './external'
import {
  createCoreTableHeadCellInternalProps,
  type IYCoreTableHeadCellInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IYCoreTableHeadCellProps extends IYCoreTableHeadCellExternalProps, IYCoreTableHeadCellInternalProps {}

export const createCoreTableHeadCellProps = (): IYCoreTableHeadCellProps => ({
  ...createCoreTableHeadCellExternalProps(),
  ...createCoreTableHeadCellInternalProps(),
})
