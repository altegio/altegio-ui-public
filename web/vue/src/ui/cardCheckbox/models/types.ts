import type { TDefinedVueProps } from '~vue/utils/utility-types'
import { createCoreCardCheckboxProps, type IYCoreCardCheckboxProps } from '~core/ui/cardCheckbox/models/types'

export interface IYVueCoreCardCheckboxProps extends IYCoreCardCheckboxProps {}

export interface IYVueCardCheckboxProps {
  disabled?: IYVueCoreCardCheckboxProps['disabled']
  size?: IYVueCoreCardCheckboxProps['size']
  checked?: IYVueCoreCardCheckboxProps['checked']
}

export const createVueCardCheckboxProps = (): TDefinedVueProps<IYVueCardCheckboxProps> => {
  const { disabled, size, checked } = createCoreCardCheckboxProps()

  return {
    disabled,
    size,
    checked,
  }
}
