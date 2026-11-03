import {
  createCoreBreadcrumbsProps,
  type IAltCoreBreadcrumbsProps,
} from '~core/ui/breadcrumbs/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueBreadcrumbsProps {
  accessibleName?: IAltCoreBreadcrumbsProps['accessibleName']
}

export const createVueBreadcrumbsProps = (): TDefinedVueProps<IAltVueBreadcrumbsProps> => {
  const { accessibleName } = createCoreBreadcrumbsProps()

  return { accessibleName }
}
