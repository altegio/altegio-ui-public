import {
  createCoreBreadcrumbsExternalProps,
  type IAltCoreBreadcrumbsExternalProps,
} from './external'
import {
  createCoreBreadcrumbsInternalProps,
  type IAltCoreBreadcrumbsInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreBreadcrumbsProps extends IAltCoreBreadcrumbsExternalProps, IAltCoreBreadcrumbsInternalProps {}

export const createCoreBreadcrumbsProps = (): IAltCoreBreadcrumbsProps => ({
  ...createCoreBreadcrumbsExternalProps(),
  ...createCoreBreadcrumbsInternalProps(),
})
