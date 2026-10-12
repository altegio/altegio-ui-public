import type { TDefinedVueProps } from '~vue/utils/utility-types'
import { createCoreCardRadioProps, type IYCoreCardRadioProps } from '~core/ui/cardRadio/models/types'

export interface IYVueCoreCardRadioProps extends IYCoreCardRadioProps {}

export interface IYVueCardRadioProps {
  disabled?: IYVueCoreCardRadioProps['disabled']
  checked?: IYVueCoreCardRadioProps['checked']
  size?: IYVueCoreCardRadioProps['size']
}

export const createVueCardRadioProps = (): TDefinedVueProps<IYVueCardRadioProps> => {
  const { disabled, checked, size } = createCoreCardRadioProps()

  return {
    disabled,
    checked,
    size,
  }
}
