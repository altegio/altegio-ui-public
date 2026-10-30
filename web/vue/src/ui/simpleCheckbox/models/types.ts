import type { TDefinedVueProps } from '~vue/utils/utility-types'

import {
  createCoreSimpleCheckboxProps,
  type IAltCoreSimpleCheckboxProps,
} from '~core/ui/simpleCheckbox/models/types'
import type { SimpleCheckboxCheckedEvent } from '~core/ui/simpleCheckbox/models/types/events'

export interface IAltVueCoreSimpleCheckboxProps extends Omit<IAltCoreSimpleCheckboxProps, 'checked'> {
  modelValue: IAltCoreSimpleCheckboxProps['checked']
}

export interface IAltVueSimpleCheckboxProps {
  modelValue: IAltVueCoreSimpleCheckboxProps['modelValue']
  indeterminate?: IAltVueCoreSimpleCheckboxProps['indeterminate']
  size?: IAltVueCoreSimpleCheckboxProps['size']
  disabled?: IAltVueCoreSimpleCheckboxProps['disabled']
  error?: IAltVueCoreSimpleCheckboxProps['error']
  hovered?: IAltVueCoreSimpleCheckboxProps['hovered']
}

export const createVueSimpleCheckboxProps = (): TDefinedVueProps<IAltVueSimpleCheckboxProps> => {
  const { size, disabled, error, indeterminate, hovered } = createCoreSimpleCheckboxProps()

  return { size, indeterminate, disabled, error, hovered }
}

export interface IAltVueSimpleCheckboxEmits {
  (event: 'update:modelValue', payload: SimpleCheckboxCheckedEvent['detail']['checked']): void
}
