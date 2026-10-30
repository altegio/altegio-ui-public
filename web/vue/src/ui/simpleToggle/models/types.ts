import type { TDefinedVueProps } from '~vue/utils/utility-types'
import type { SimpleToggleCheckedEvent } from '~core/ui/simpleToggle/models/types/events'
import { createCoreSimpleToggleProps, type IAltCoreSimpleToggleProps } from '~core/ui/simpleToggle/models/types'

export interface IAltVueCoreSimpleToggleProps extends Omit<IAltCoreSimpleToggleProps, 'checked'> {
  modelValue: IAltCoreSimpleToggleProps['checked']
}

export interface IAltVueSimpleToggleProps {
  modelValue: IAltVueCoreSimpleToggleProps['modelValue']
  disabled?: IAltVueCoreSimpleToggleProps['disabled']
  size?: IAltVueCoreSimpleToggleProps['size']
  hovered?: IAltVueCoreSimpleToggleProps['hovered']
}

export const createVueSimpleToggleProps = (): TDefinedVueProps<IAltVueSimpleToggleProps> => {
  const { disabled, size, hovered } = createCoreSimpleToggleProps()

  return { disabled, size, hovered }
}

export interface IAltVueSimpleToggleEmits {
  (event: 'update:modelValue', payload: SimpleToggleCheckedEvent['detail']['checked']): void
}
