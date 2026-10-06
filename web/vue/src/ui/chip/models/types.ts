import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreChipProps,
  type IYCoreChipProps,
} from '~core/ui/chip/models/types'

export interface IYVueCoreChipProps extends IYCoreChipProps {}

export interface IYVueChipProps {
  labelText: IYVueCoreChipProps['labelText']
  active?: IYVueCoreChipProps['active']
  iconLeft?: IYVueCoreChipProps['iconLeft']
  size?: IYVueCoreChipProps['size']
  disabled?: IYVueCoreChipProps['disabled']
}

export interface IYVueChipEmits {
  (e: 'update:active', value: IYVueCoreChipProps['active']): void
}

export const createVueChipProps = (): TDefinedVueProps<IYVueChipProps> => {
  const { iconLeft, active, size, disabled } = createCoreChipProps()

  return {
    iconLeft: iconLeft ? () => iconLeft : undefined,
    active,
    size,
    disabled,
   }
}
