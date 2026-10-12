import { pick } from 'radash'
import { createCoreCardWrapperProps, type IYCoreCardWrapperProps } from '~core/ui/cardWrapper/models/types'
import { createCoreColorIconExternalProps, type IYCoreColorIconExternalProps } from '~core/ui/colorIcon/models/types'

export interface IYCoreCardIconExternalProps
  extends Pick<IYCoreCardWrapperProps, 'size' | 'disabled'>,
  Pick<IYCoreColorIconExternalProps, 'icon' | 'variant'> {
}

export const createCoreCardIconExternalProps = (): IYCoreCardIconExternalProps => ({
  ...pick(createCoreCardWrapperProps(), ['size', 'disabled']),
  ...pick(createCoreColorIconExternalProps(), ['icon', 'variant']),
})
