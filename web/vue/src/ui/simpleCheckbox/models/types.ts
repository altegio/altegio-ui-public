import type { TDefinedVueProps } from '~vue/utils/utility-types'

import {
  createCoreSimpleCheckboxProps,
  type IYCoreSimpleCheckboxProps,
} from '~core/ui/simpleCheckbox/models/types'
import type { SimpleCheckboxCheckedEvent } from '~core/ui/simpleCheckbox/models/types/events'

export interface IYVueCoreSimpleCheckboxProps extends Omit<IYCoreSimpleCheckboxProps, 'checked'> {
  modelValue: IYCoreSimpleCheckboxProps['checked']
}

export interface IYVueSimpleCheckboxProps {
  modelValue: IYVueCoreSimpleCheckboxProps['modelValue']
  indeterminate?: IYVueCoreSimpleCheckboxProps['indeterminate']
  size?: IYVueCoreSimpleCheckboxProps['size']
  disabled?: IYVueCoreSimpleCheckboxProps['disabled']
  error?: IYVueCoreSimpleCheckboxProps['error']
  hovered?: IYVueCoreSimpleCheckboxProps['hovered']
}

export const createVueSimpleCheckboxProps = (): TDefinedVueProps<IYVueSimpleCheckboxProps> => {
  const { size, disabled, error, indeterminate, hovered } = createCoreSimpleCheckboxProps()

  return { size, indeterminate, disabled, error, hovered }
}

export interface IYVueSimpleCheckboxEmits {
  (event: 'update:modelValue', payload: SimpleCheckboxCheckedEvent['detail']['checked']): void
}
