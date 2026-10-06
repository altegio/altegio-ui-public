import { createCoreIconExternalProps, type IYCoreIconExternalProps } from '~core/ui/icon/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreIconProps extends IYCoreIconExternalProps {}

export interface IYVueIconProps {
  icon: IYVueCoreIconProps['icon']
  size?: IYVueCoreIconProps['size']
}

export const createVueIconProps = (): TDefinedVueProps<IYVueIconProps> => {
  const { size } = createCoreIconExternalProps()
  return { size }
}
