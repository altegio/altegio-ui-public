import {
  createCoreFunctionalModalProps,
  type IYCoreFunctionalModalProps,
} from '~core/ui/functionalModal/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreFunctionalModalProps extends Omit<IYCoreFunctionalModalProps, 'open'> {
  modelValue: IYCoreFunctionalModalProps['open']
}

export interface IYVueFunctionalModalProps {
  modelValue: IYCoreFunctionalModalProps['open']
  size?: IYCoreFunctionalModalProps['size']
  width?: IYCoreFunctionalModalProps['width']
  hideOverlay?: IYCoreFunctionalModalProps['hideOverlay']
  hideFooter?: IYCoreFunctionalModalProps['hideFooter']
  preventEscape?: IYCoreFunctionalModalProps['preventEscape']
  fullScreen?: IYCoreFunctionalModalProps['fullScreen']
  heading?: IYCoreFunctionalModalProps['heading']
  subHeading?: IYCoreFunctionalModalProps['subHeading']
  locale?: IYCoreFunctionalModalProps['locale']
  enableTeleport?: boolean
}

export const createVueFunctionalModalProps = (): TDefinedVueProps<IYVueFunctionalModalProps> => {
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
    locale: locale ? () => locale : undefined,
    enableTeleport: false,
  }
}

export interface IYVueFunctionalModalEmits {
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
  (event: 'update:modelValue', payload: IYCoreFunctionalModalProps['open']): void
}
