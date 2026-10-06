import {
  createCoreFieldIconProps,
  type IYCoreFieldIconProps,
} from '~core/ui/fieldIcon/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreFieldIconProps extends IYCoreFieldIconProps {}

export interface IYVueFieldIconProps {
  icon?: IYVueCoreFieldIconProps['icon']
  disabled?: IYVueCoreFieldIconProps['disabled']
  size?: IYVueCoreFieldIconProps['size']
  hoverable?: IYVueCoreFieldIconProps['hoverable']
  clickable?: IYVueCoreFieldIconProps['clickable']
  readonly?: IYVueCoreFieldIconProps['readonly']
}

export const createVueFieldIconProps = (): TDefinedVueProps<IYVueFieldIconProps> => {
  const { icon, disabled, size, hoverable, clickable, readonly } = createCoreFieldIconProps()

  return {
    icon: () => icon,
    disabled,
    size,
    hoverable,
    clickable,
    readonly,
  }
}
