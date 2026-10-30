import { createCoreIconExternalProps, type IAltCoreIconExternalProps } from '~core/ui/icon/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreIconProps extends IAltCoreIconExternalProps {}

export interface IAltVueIconProps {
  icon: IAltVueCoreIconProps['icon']
  size?: IAltVueCoreIconProps['size']
}

export const createVueIconProps = (): TDefinedVueProps<IAltVueIconProps> => {
  const { size } = createCoreIconExternalProps()
  return { size }
}
