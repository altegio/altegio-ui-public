import {
  createCoreBreadcrumbsItemExternalProps,
  type IAltCoreBreadcrumbsItemExternalProps,
} from '~core/ui/breadcrumbsItem/models/types'

export interface IAltNgBreadcrumbsItemProps extends IAltCoreBreadcrumbsItemExternalProps {}

export const createNgBreadcrumbsItemProps = (): IAltNgBreadcrumbsItemProps => createCoreBreadcrumbsItemExternalProps()
