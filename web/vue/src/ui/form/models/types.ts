import {
  createCoreFormExternalProps,
  type FormInvalidEvent,
  type FormResetEvent,
  type FormSubmitEvent,
  type IAltCoreFormExternalProps,
} from '~core/ui/form/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueFormProps {
  noErrorFocus?: IAltCoreFormExternalProps['noErrorFocus']
}

export const createVueFormProps = (): TDefinedVueProps<IAltVueFormProps> => {
  const { noErrorFocus } = createCoreFormExternalProps()

  return { noErrorFocus }
}

export interface IAltVueFormEmits {
  (event: 'submit', payload: FormSubmitEvent): void
  (event: 'validation-error', payload: FormInvalidEvent): void
  (event: 'reset', payload: FormResetEvent): void
}
