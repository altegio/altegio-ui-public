import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreSimpleRadioButtonProps,
  type IYCoreSimpleRadioButtonProps,
} from '~core/ui/simpleRadioButton/models/types'
import type { SimpleToggleCheckedEvent } from '~core/ui/simpleToggle/models/types/events'

export interface IYVueCoreSimpleRadioButtonProps extends Omit<IYCoreSimpleRadioButtonProps, 'checked'> {
  modelValue: IYCoreSimpleRadioButtonProps['checked']
}

export interface IYVueSimpleRadioButtonProps {
  modelValue: IYVueCoreSimpleRadioButtonProps['modelValue']
  name?: IYVueCoreSimpleRadioButtonProps['name']
  size?: IYVueCoreSimpleRadioButtonProps['size']
  disabled?: IYVueCoreSimpleRadioButtonProps['disabled']
  error?: IYVueCoreSimpleRadioButtonProps['error']
  hovered?: IYVueCoreSimpleRadioButtonProps['hovered']
}

export const createVueSimpleRadioButtonProps = (): TDefinedVueProps<IYVueSimpleRadioButtonProps> => {
  const { size, disabled, error, name, hovered } = createCoreSimpleRadioButtonProps()

  return { size, name, disabled, error, hovered }
}

export interface IYVueSimpleRadioButtonEmits {
  (event: 'update:modelValue', payload: SimpleToggleCheckedEvent['detail']['checked']): void
}
