import type { TDefinedVueProps } from '~vue/utils/utility-types'
import { createCoreCardRadioProps, type IAltCoreCardRadioProps } from '~core/ui/cardRadio/models/types'

export interface IAltVueCoreCardRadioProps extends IAltCoreCardRadioProps {}

export interface IAltVueCardRadioProps {
  disabled?: IAltVueCoreCardRadioProps['disabled']
  checked?: IAltVueCoreCardRadioProps['checked']
  size?: IAltVueCoreCardRadioProps['size']
}

export const createVueCardRadioProps = (): TDefinedVueProps<IAltVueCardRadioProps> => {
  const { disabled, checked, size } = createCoreCardRadioProps()

  return {
    disabled,
    checked,
    size,
  }
}
