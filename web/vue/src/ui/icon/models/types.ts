import { createCoreIconExternalProps, type IAltCoreIconExternalProps } from '~core/ui/icon/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreIconProps extends IAltCoreIconExternalProps {}

export interface IAltVueIconProps {
  icon: IAltVueCoreIconProps['icon']
  size?: IAltVueCoreIconProps['size']
  accessibleName?: IAltVueCoreIconProps['accessibleName']
}

export const createVueIconProps = (): TDefinedVueProps<IAltVueIconProps> => {
  const { size, accessibleName } = createCoreIconExternalProps()
  return { size, accessibleName }
}
