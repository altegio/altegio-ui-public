import {
  createCoreListItemExternalProps,
  type IAltCoreListItemExternalProps,
} from './external'
import {
  createCoreListItemInternalProps,
  type IAltCoreListItemInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreListItemProps extends IAltCoreListItemExternalProps, IAltCoreListItemInternalProps {}

export const createCoreListItemProps = (): IAltCoreListItemProps => ({
  ...createCoreListItemExternalProps(),
  ...createCoreListItemInternalProps(),
})
