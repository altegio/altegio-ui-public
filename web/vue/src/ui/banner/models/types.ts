import {
  createCoreBannerProps,
  type IAltCoreBannerProps,
} from '~core/ui/banner/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueBannerProps {
  variant?: IAltCoreBannerProps['variant']
  layout?: IAltCoreBannerProps['layout']
  title?: IAltCoreBannerProps['title']
  description?: IAltCoreBannerProps['description']
  icon?: IAltCoreBannerProps['icon']
  hideIcon?: IAltCoreBannerProps['hideIcon']
  closable?: IAltCoreBannerProps['closable']
  closeLabel?: IAltCoreBannerProps['closeLabel']
}

export interface IAltVueBannerEmits {
  (event: 'close'): void
}

export const createVueBannerProps = (): TDefinedVueProps<IAltVueBannerProps> => {
  const {
    variant,
    layout,
    title,
    description,
    icon,
    hideIcon,
    closable,
    closeLabel,
  } = createCoreBannerProps()

  return {
    variant,
    layout,
    title,
    description,
    icon: icon ? () => icon : undefined,
    hideIcon,
    closable,
    closeLabel,
  }
}
