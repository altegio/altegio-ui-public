import {
  createCoreBreadcrumbsItemExternalProps,
  type IAltCoreBreadcrumbsItemExternalProps,
} from './external'
import {
  createCoreBreadcrumbsItemInternalProps,
  type IAltCoreBreadcrumbsItemInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreBreadcrumbsItemProps extends IAltCoreBreadcrumbsItemExternalProps, IAltCoreBreadcrumbsItemInternalProps {}

export const createCoreBreadcrumbsItemProps = (): IAltCoreBreadcrumbsItemProps => ({
  ...createCoreBreadcrumbsItemExternalProps(),
  ...createCoreBreadcrumbsItemInternalProps(),
})
