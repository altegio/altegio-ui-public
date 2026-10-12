import {
  createCoreTableCellExternalProps,
  type IYCoreTableCellExternalProps,
} from './external'
import {
  createCoreTableCellInternalProps,
  type IYCoreTableCellInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IYCoreTableCellProps extends IYCoreTableCellExternalProps, IYCoreTableCellInternalProps {}

export const createCoreTableCellProps = (): IYCoreTableCellProps => ({
  ...createCoreTableCellExternalProps(),
  ...createCoreTableCellInternalProps(),
})
