import {
  createCoreFunctionalModalProps,
  type IAltCoreFunctionalModalProps,
} from '~core/ui/functionalModal/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreFunctionalModalProps extends Omit<IAltCoreFunctionalModalProps, 'open'> {
  modelValue: IAltCoreFunctionalModalProps['open']
}

export interface IAltVueFunctionalModalProps {
  modelValue: IAltCoreFunctionalModalProps['open']
  size?: IAltCoreFunctionalModalProps['size']
  width?: IAltCoreFunctionalModalProps['width']
  hideOverlay?: IAltCoreFunctionalModalProps['hideOverlay']
  hideFooter?: IAltCoreFunctionalModalProps['hideFooter']
  preventEscape?: IAltCoreFunctionalModalProps['preventEscape']
  fullScreen?: IAltCoreFunctionalModalProps['fullScreen']
  heading?: IAltCoreFunctionalModalProps['heading']
  subHeading?: IAltCoreFunctionalModalProps['subHeading']
  dialogLabel?: IAltCoreFunctionalModalProps['dialogLabel']
  locale?: IAltCoreFunctionalModalProps['locale']
  enableTeleport?: boolean
}

export const createVueFunctionalModalProps = (): TDefinedVueProps<IAltVueFunctionalModalProps> => {
  const { locale, ...props } = createCoreFunctionalModalProps()

  return {
    size: props.size,
    width: props.width,
    hideOverlay: props.hideOverlay,
    hideFooter: props.hideFooter,
    preventEscape: props.preventEscape,
    fullScreen: props.fullScreen,
    heading: props.heading,
    subHeading: props.subHeading,
    dialogLabel: props.dialogLabel,
    locale: locale ? () => locale : undefined,
    enableTeleport: false,
  }
}

export interface IAltVueFunctionalModalEmits {
  (
    event:
      'open' |
      'close' |
      'click-close-icon' |
      'click-overlay' |
      'click-activator' |
      'press-escape' |
      'cancel' |
      'submit',
  ): void
  (event: 'update:modelValue', payload: IAltCoreFunctionalModalProps['open']): void
}
