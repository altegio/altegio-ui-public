import type { TDefinedVueProps } from '~vue/utils/utility-types'
import type { SimpleToggleCheckedEvent } from '~core/ui/simpleToggle/models/types/events'
import { createCoreSimpleToggleProps, type IAltCoreSimpleToggleProps } from '~core/ui/simpleToggle/models/types'

// accessibleDescription is set by labelled core components only
export interface IAltVueCoreSimpleToggleProps extends Omit<IAltCoreSimpleToggleProps, 'checked' | 'accessibleDescription'> {
  modelValue: IAltCoreSimpleToggleProps['checked']
}

export interface IAltVueSimpleToggleProps {
  modelValue: IAltVueCoreSimpleToggleProps['modelValue']
  disabled?: IAltVueCoreSimpleToggleProps['disabled']
  size?: IAltVueCoreSimpleToggleProps['size']
  hovered?: IAltVueCoreSimpleToggleProps['hovered']
  accessibleName?: IAltVueCoreSimpleToggleProps['accessibleName']
}

export const createVueSimpleToggleProps = (): TDefinedVueProps<IAltVueSimpleToggleProps> => {
  const { disabled, size, hovered, accessibleName } = createCoreSimpleToggleProps()

  return { disabled, size, hovered, accessibleName }
}

export interface IAltVueSimpleToggleEmits {
  (event: 'update:modelValue', payload: SimpleToggleCheckedEvent['detail']['checked']): void
}
