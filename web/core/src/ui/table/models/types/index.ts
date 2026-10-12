import {
  createCoreTableExternalProps,
  type IYCoreTableExternalProps,
} from './external'
import {
  createCoreTableInternalProps,
  type IYCoreTableInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IYCoreTableProps extends IYCoreTableExternalProps, IYCoreTableInternalProps {}

export const createCoreTableProps = (): IYCoreTableProps => ({
  ...createCoreTableExternalProps(),
  ...createCoreTableInternalProps(),
})
