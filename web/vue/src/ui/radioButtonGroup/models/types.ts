import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreRadioButtonGroupExternalProps,
  type IYCoreRadioButtonGroupExternalProps,
  type RadioButtonGroupChangeEvent,
} from '~core/ui/radioButtonGroup/models/types'

export interface IYVueCoreRadioButtonGroupProps extends Omit<
  IYCoreRadioButtonGroupExternalProps,
  'value'
> {
  modelValue: IYCoreRadioButtonGroupExternalProps['value']
}

export interface IYVueRadioButtonGroupProps {
  modelValue: IYVueCoreRadioButtonGroupProps['modelValue']
  size?: IYVueCoreRadioButtonGroupProps['size']
  alignment?: IYVueCoreRadioButtonGroupProps['alignment']
  direction?: IYVueCoreRadioButtonGroupProps['direction']
  labelText?: IYVueCoreRadioButtonGroupProps['labelText']
  labelTooltipText?: IYVueCoreRadioButtonGroupProps['labelTooltipText']
  labelDebounce?: IYVueCoreRadioButtonGroupProps['labelDebounce']
  labelTooltipActive?: IYVueCoreRadioButtonGroupProps['labelTooltipActive']
}

export const createVueRadioButtonGroupProps =
  (): TDefinedVueProps<IYVueRadioButtonGroupProps> => {
    const { size, direction, alignment, labelText, labelTooltipText, labelDebounce, labelTooltipActive } =
      createCoreRadioButtonGroupExternalProps()
    return {
      size,
      direction,
      alignment,
      labelText,
      labelTooltipText,
      labelDebounce,
      labelTooltipActive,
    }
  }

export interface IYVueRadioButtonGroupEmits {
  (event: 'update:modelValue', payload: RadioButtonGroupChangeEvent['detail']['value']): void
}
