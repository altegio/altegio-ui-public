import {
  createCoreBreadcrumbsExternalProps,
  type IAltCoreBreadcrumbsExternalProps,
} from '~core/ui/breadcrumbs/models/types'

export interface IAltNgBreadcrumbsProps extends IAltCoreBreadcrumbsExternalProps {}

export const createNgBreadcrumbsProps = (): IAltNgBreadcrumbsProps => createCoreBreadcrumbsExternalProps()
