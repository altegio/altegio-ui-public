import {
  createCoreFieldIconProps,
  type IAltCoreFieldIconProps,
} from '~core/ui/fieldIcon/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreFieldIconProps extends IAltCoreFieldIconProps {}

export interface IAltVueFieldIconProps {
  icon?: IAltVueCoreFieldIconProps['icon']
  disabled?: IAltVueCoreFieldIconProps['disabled']
  size?: IAltVueCoreFieldIconProps['size']
  hoverable?: IAltVueCoreFieldIconProps['hoverable']
  clickable?: IAltVueCoreFieldIconProps['clickable']
  accessibleName?: IAltVueCoreFieldIconProps['accessibleName']
  readonly?: IAltVueCoreFieldIconProps['readonly']
}

export const createVueFieldIconProps = (): TDefinedVueProps<IAltVueFieldIconProps> => {
  const { accessibleName, icon, disabled, size, hoverable, clickable, readonly } = createCoreFieldIconProps()

  return {
    icon: () => icon,
    disabled,
    size,
    hoverable,
    clickable,
    accessibleName,
    readonly,
  }
}
