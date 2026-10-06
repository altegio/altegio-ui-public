import type { TDefinedVueProps } from '~vue/utils/utility-types'
import type { SimpleToggleCheckedEvent } from '~core/ui/simpleToggle/models/types/events'
import { createCoreSimpleToggleProps, type IYCoreSimpleToggleProps } from '~core/ui/simpleToggle/models/types'

export interface IYVueCoreSimpleToggleProps extends Omit<IYCoreSimpleToggleProps, 'checked'> {
  modelValue: IYCoreSimpleToggleProps['checked']
}

export interface IYVueSimpleToggleProps {
  modelValue: IYVueCoreSimpleToggleProps['modelValue']
  disabled?: IYVueCoreSimpleToggleProps['disabled']
  size?: IYVueCoreSimpleToggleProps['size']
  hovered?: IYVueCoreSimpleToggleProps['hovered']
}

export const createVueSimpleToggleProps = (): TDefinedVueProps<IYVueSimpleToggleProps> => {
  const { disabled, size, hovered } = createCoreSimpleToggleProps()

  return { disabled, size, hovered }
}

export interface IYVueSimpleToggleEmits {
  (event: 'update:modelValue', payload: SimpleToggleCheckedEvent['detail']['checked']): void
}
