import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreChipProps,
  type IAltCoreChipProps,
} from '~core/ui/chip/models/types'

export interface IAltVueCoreChipProps extends IAltCoreChipProps {}

export interface IAltVueChipProps {
  labelText: IAltVueCoreChipProps['labelText']
  active?: IAltVueCoreChipProps['active']
  iconLeft?: IAltVueCoreChipProps['iconLeft']
  size?: IAltVueCoreChipProps['size']
  disabled?: IAltVueCoreChipProps['disabled']
}

export interface IAltVueChipEmits {
  (e: 'update:active', value: IAltVueCoreChipProps['active']): void
}

export const createVueChipProps = (): TDefinedVueProps<IAltVueChipProps> => {
  const { iconLeft, active, size, disabled } = createCoreChipProps()

  return {
    iconLeft: iconLeft ? () => iconLeft : undefined,
    active,
    size,
    disabled,
   }
}
