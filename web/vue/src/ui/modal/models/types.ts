import { createCoreModalProps, type IAltCoreModalProps } from '~core/ui/modal/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreModalProps extends Omit<IAltCoreModalProps, 'open'> {
  modelValue: IAltCoreModalProps['open']
}

export interface IAltVueModalProps {
  modelValue: IAltVueCoreModalProps['modelValue']
  size: IAltVueCoreModalProps['size']
  variant: IAltVueCoreModalProps['variant']
  width: IAltVueCoreModalProps['width']
  hideOverlay: IAltVueCoreModalProps['hideOverlay']
  preventEscape: IAltVueCoreModalProps['preventEscape']
  fullScreen: IAltVueCoreModalProps['fullScreen']
  dialogLabel: IAltVueCoreModalProps['dialogLabel']
  enableTeleport: boolean | undefined
}

export interface IAltVueModalEmits {
  (event: 'open' | 'close' | 'click-close-icon' | 'click-overlay' | 'click-activator' | 'press-escape'): void
  (event: 'update:modelValue', payload: IAltCoreModalProps['open']): void
}

export const createVueModalProps = (): TDefinedVueProps<IAltVueModalProps> => {
  const {
    open: modelValue,
    size,
    variant,
    width,
    hideOverlay,
    preventEscape,
    fullScreen,
    dialogLabel,
  } = createCoreModalProps()

  return {
    modelValue,
    size,
    variant,
    width,
    hideOverlay,
    preventEscape,
    fullScreen,
    dialogLabel,
    enableTeleport: false,
  }
}
