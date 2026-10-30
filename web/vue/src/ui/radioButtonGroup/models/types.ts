import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreRadioButtonGroupExternalProps,
  type IAltCoreRadioButtonGroupExternalProps,
  type RadioButtonGroupChangeEvent,
} from '~core/ui/radioButtonGroup/models/types'

export interface IAltVueCoreRadioButtonGroupProps extends Omit<
  IAltCoreRadioButtonGroupExternalProps,
  'value'
> {
  modelValue: IAltCoreRadioButtonGroupExternalProps['value']
}

export interface IAltVueRadioButtonGroupProps {
  modelValue: IAltVueCoreRadioButtonGroupProps['modelValue']
  size?: IAltVueCoreRadioButtonGroupProps['size']
  alignment?: IAltVueCoreRadioButtonGroupProps['alignment']
  direction?: IAltVueCoreRadioButtonGroupProps['direction']
  labelText?: IAltVueCoreRadioButtonGroupProps['labelText']
  labelTooltipText?: IAltVueCoreRadioButtonGroupProps['labelTooltipText']
  labelDebounce?: IAltVueCoreRadioButtonGroupProps['labelDebounce']
  labelTooltipActive?: IAltVueCoreRadioButtonGroupProps['labelTooltipActive']
}

export const createVueRadioButtonGroupProps =
  (): TDefinedVueProps<IAltVueRadioButtonGroupProps> => {
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

export interface IAltVueRadioButtonGroupEmits {
  (event: 'update:modelValue', payload: RadioButtonGroupChangeEvent['detail']['value']): void
}
