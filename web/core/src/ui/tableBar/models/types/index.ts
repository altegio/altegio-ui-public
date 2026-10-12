import {
  createCoreTableBarExternalProps,
  type IYCoreTableBarExternalProps,
} from './external'
import {
  createCoreTableBarInternalProps,
  type IYCoreTableBarInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IYCoreTableBarProps extends IYCoreTableBarExternalProps, IYCoreTableBarInternalProps {}

export const createCoreTableBarProps = (): IYCoreTableBarProps => ({
  ...createCoreTableBarExternalProps(),
  ...createCoreTableBarInternalProps(),
})
