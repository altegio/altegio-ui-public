import type { TDefinedVueProps } from '~vue/utils/utility-types'
import { createCoreCardCheckboxProps, type IAltCoreCardCheckboxProps } from '~core/ui/cardCheckbox/models/types'

export interface IAltVueCoreCardCheckboxProps extends IAltCoreCardCheckboxProps {}

export interface IAltVueCardCheckboxProps {
  disabled?: IAltVueCoreCardCheckboxProps['disabled']
  size?: IAltVueCoreCardCheckboxProps['size']
  checked?: IAltVueCoreCardCheckboxProps['checked']
}

export const createVueCardCheckboxProps = (): TDefinedVueProps<IAltVueCardCheckboxProps> => {
  const { disabled, size, checked } = createCoreCardCheckboxProps()

  return {
    disabled,
    size,
    checked,
  }
}
