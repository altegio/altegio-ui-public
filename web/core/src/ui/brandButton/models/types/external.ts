import { createCoreSimpleButtonExternalProps, type IAltCoreSimpleButtonExternalProps } from '~core/ui/simpleButton/models/types/external'
import { pick } from 'radash'

export enum EAltCoreBrandButtonVariant {
  WhatsApp = 'whatsapp',
}

export interface IAltCoreBrandButtonExternalProps extends Pick<IAltCoreSimpleButtonExternalProps, 'size' | 'disabled' | 'loading'> {
  variant: EAltCoreBrandButtonVariant
  text: string
}

export const createCoreBrandButtonExternalProps = (): IAltCoreBrandButtonExternalProps => {
  return {
    ...pick(createCoreSimpleButtonExternalProps(), ['size', 'disabled', 'loading']),
    variant: EAltCoreBrandButtonVariant.WhatsApp,
    text: '',
  }
}
