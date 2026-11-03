export interface IAltCoreBreadcrumbsItemInternalProps {

  /** Set by the breadcrumbs: the first item has no separator */
  first: boolean

  /** Set by the breadcrumbs: the last item is the current page when no item is marked `current` */
  implicitCurrent: boolean
}

export const createCoreBreadcrumbsItemInternalProps = (): IAltCoreBreadcrumbsItemInternalProps => ({
  first: false,
  implicitCurrent: false,
})
