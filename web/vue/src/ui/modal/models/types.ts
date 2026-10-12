import { createCoreModalProps, type IYCoreModalProps } from '~core/ui/modal/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreModalProps extends Omit<IYCoreModalProps, 'open'> {
  modelValue: IYCoreModalProps['open']
}

export interface IYVueModalProps {
  modelValue: IYVueCoreModalProps['modelValue']
  size: IYVueCoreModalProps['size']
  variant: IYVueCoreModalProps['variant']
  width: IYVueCoreModalProps['width']
  hideOverlay: IYVueCoreModalProps['hideOverlay']
  preventEscape: IYVueCoreModalProps['preventEscape']
  fullScreen: IYVueCoreModalProps['fullScreen']
  enableTeleport: boolean | undefined
}

export interface IYVueModalEmits {
  (event: 'open' | 'close' | 'click-close-icon' | 'click-overlay' | 'click-activator' | 'press-escape'): void
  (event: 'update:modelValue', payload: IYCoreModalProps['open']): void
}

export const createVueModalProps = (): TDefinedVueProps<IYVueModalProps> => {
  const {
    open: modelValue,
    size,
    variant,
    width,
    hideOverlay,
    preventEscape,
    fullScreen,
  } = createCoreModalProps()

  return {
    modelValue,
    size,
    variant,
    width,
    hideOverlay,
    preventEscape,
    fullScreen,
    enableTeleport: false,
  }
}
