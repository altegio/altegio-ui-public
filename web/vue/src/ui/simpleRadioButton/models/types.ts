import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreSimpleRadioButtonProps,
  type IAltCoreSimpleRadioButtonProps,
} from '~core/ui/simpleRadioButton/models/types'
import type { SimpleToggleCheckedEvent } from '~core/ui/simpleToggle/models/types/events'

export interface IAltVueCoreSimpleRadioButtonProps extends Omit<IAltCoreSimpleRadioButtonProps, 'checked'> {
  modelValue: IAltCoreSimpleRadioButtonProps['checked']
}

export interface IAltVueSimpleRadioButtonProps {
  modelValue: IAltVueCoreSimpleRadioButtonProps['modelValue']
  name?: IAltVueCoreSimpleRadioButtonProps['name']
  size?: IAltVueCoreSimpleRadioButtonProps['size']
  disabled?: IAltVueCoreSimpleRadioButtonProps['disabled']
  error?: IAltVueCoreSimpleRadioButtonProps['error']
  hovered?: IAltVueCoreSimpleRadioButtonProps['hovered']
}

export const createVueSimpleRadioButtonProps = (): TDefinedVueProps<IAltVueSimpleRadioButtonProps> => {
  const { size, disabled, error, name, hovered } = createCoreSimpleRadioButtonProps()

  return { size, name, disabled, error, hovered }
}

export interface IAltVueSimpleRadioButtonEmits {
  (event: 'update:modelValue', payload: SimpleToggleCheckedEvent['detail']['checked']): void
}
