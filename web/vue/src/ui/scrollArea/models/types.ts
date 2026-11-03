import {
  createCoreScrollAreaExternalProps,
  type IAltCoreScrollAreaExternalProps,
  type ScrollAreaScrollEvent,
} from '~core/ui/scrollArea/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueScrollAreaProps {
  orientation?: IAltCoreScrollAreaExternalProps['orientation']
  accessibleName?: IAltCoreScrollAreaExternalProps['accessibleName']
}

export const createVueScrollAreaProps = (): TDefinedVueProps<IAltVueScrollAreaProps> => {
  const { orientation, accessibleName } = createCoreScrollAreaExternalProps()

  return {
    orientation,
    accessibleName,
  }
}

export interface IAltVueScrollAreaEmits {
  (event: 'scroll-change', payload: ScrollAreaScrollEvent): void
}
