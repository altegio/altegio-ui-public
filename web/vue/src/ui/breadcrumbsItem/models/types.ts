import {
  createCoreBreadcrumbsItemExternalProps,
  type IAltCoreBreadcrumbsItemExternalProps,
} from '~core/ui/breadcrumbsItem/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueBreadcrumbsItemProps {
  href?: IAltCoreBreadcrumbsItemExternalProps['href']
  target?: IAltCoreBreadcrumbsItemExternalProps['target']
  current?: IAltCoreBreadcrumbsItemExternalProps['current']
}

export const createVueBreadcrumbsItemProps = (): TDefinedVueProps<IAltVueBreadcrumbsItemProps> => {
  const { href, target, current } = createCoreBreadcrumbsItemExternalProps()

  return { href, target, current }
}
