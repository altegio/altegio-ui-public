import {
  createCoreFieldWrapperProps,
  type IAltCoreFieldWrapperProps,
  type ClickOutsideEvent,
  type FocusEvent,
  type BlurEvent,
  type MouseEnterEvent,
  type MouseLeaveEvent,
} from '~core/ui/fieldWrapper/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreFieldWrapperProps extends IAltCoreFieldWrapperProps {}

export interface IAltVueFieldWrapperProps {
  disabled?: IAltVueCoreFieldWrapperProps['disabled']
  readonly?: IAltVueCoreFieldWrapperProps['readonly']
  error?: IAltVueCoreFieldWrapperProps['error']
  size?: IAltVueCoreFieldWrapperProps['size']
  clickable?: IAltVueCoreFieldWrapperProps['clickable']
}

export const createVueFieldWrapperProps = (): TDefinedVueProps<IAltVueFieldWrapperProps> => {
  const { disabled, readonly, error, size, clickable } = createCoreFieldWrapperProps()
  return {
    disabled,
    readonly,
    error,
    size,
    clickable,
  }
}

export interface IAltVueFieldWrapperEmits {
  (event: 'click', payload: Event): void
  (event: 'click-outside', payload: ClickOutsideEvent): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'blur', payload: BlurEvent): void
  (event: 'mouse-enter', payload: MouseEnterEvent): void
  (event: 'mouse-leave', payload: MouseLeaveEvent): void
}

