import {
  createCoreTableBarExternalProps,
  type IAltCoreTableBarExternalProps,
} from './external'
import {
  createCoreTableBarInternalProps,
  type IAltCoreTableBarInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreTableBarProps extends IAltCoreTableBarExternalProps, IAltCoreTableBarInternalProps {}

export const createCoreTableBarProps = (): IAltCoreTableBarProps => ({
  ...createCoreTableBarExternalProps(),
  ...createCoreTableBarInternalProps(),
})
