import {
  createCoreFieldWrapperProps,
  type IYCoreFieldWrapperProps,
  type ClickOutsideEvent,
  type FocusEvent,
  type BlurEvent,
  type MouseEnterEvent,
  type MouseLeaveEvent,
} from '~core/ui/fieldWrapper/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreFieldWrapperProps extends IYCoreFieldWrapperProps {}

export interface IYVueFieldWrapperProps {
  disabled?: IYVueCoreFieldWrapperProps['disabled']
  readonly?: IYVueCoreFieldWrapperProps['readonly']
  error?: IYVueCoreFieldWrapperProps['error']
  size?: IYVueCoreFieldWrapperProps['size']
  clickable?: IYVueCoreFieldWrapperProps['clickable']
}

export const createVueFieldWrapperProps = (): TDefinedVueProps<IYVueFieldWrapperProps> => {
  const { disabled, readonly, error, size, clickable } = createCoreFieldWrapperProps()
  return {
    disabled,
    readonly,
    error,
    size,
    clickable,
  }
}

export interface IYVueFieldWrapperEmits {
  (event: 'click', payload: Event): void
  (event: 'click-outside', payload: ClickOutsideEvent): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'blur', payload: BlurEvent): void
  (event: 'mouse-enter', payload: MouseEnterEvent): void
  (event: 'mouse-leave', payload: MouseLeaveEvent): void
}

