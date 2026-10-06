import { createCoreSimpleButtonExternalProps, type IYCoreSimpleButtonExternalProps } from '~core/ui/simpleButton/models/types/external'
import { pick } from 'radash'

export enum EYCoreBrandButtonVariant {
  WhatsApp = 'whatsapp',
}

export interface IYCoreBrandButtonExternalProps extends Pick<IYCoreSimpleButtonExternalProps, 'size' | 'disabled' | 'loading'> {
  variant: EYCoreBrandButtonVariant
  text: string
}

export const createCoreBrandButtonExternalProps = (): IYCoreBrandButtonExternalProps => {
  return {
    ...pick(createCoreSimpleButtonExternalProps(), ['size', 'disabled', 'loading']),
    variant: EYCoreBrandButtonVariant.WhatsApp,
    text: '',
  }
}
