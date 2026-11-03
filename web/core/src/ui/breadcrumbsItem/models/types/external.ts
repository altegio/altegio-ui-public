export interface IAltCoreBreadcrumbsItemExternalProps {
  href: string | undefined
  target: string | undefined
  current: boolean | undefined
}

export const createCoreBreadcrumbsItemExternalProps = (): IAltCoreBreadcrumbsItemExternalProps => ({
  href: undefined,
  target: undefined,
  current: false,
})
