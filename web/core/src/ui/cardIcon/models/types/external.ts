import { pick } from 'radash'
import { createCoreCardWrapperProps, type IAltCoreCardWrapperProps } from '~core/ui/cardWrapper/models/types'
import { createCoreColorIconExternalProps, type IAltCoreColorIconExternalProps } from '~core/ui/colorIcon/models/types'

export interface IAltCoreCardIconExternalProps
  extends Pick<IAltCoreCardWrapperProps, 'size' | 'disabled'>,
  Pick<IAltCoreColorIconExternalProps, 'icon' | 'variant'> {
}

export const createCoreCardIconExternalProps = (): IAltCoreCardIconExternalProps => ({
  ...pick(createCoreCardWrapperProps(), ['size', 'disabled']),
  ...pick(createCoreColorIconExternalProps(), ['icon', 'variant']),
})
