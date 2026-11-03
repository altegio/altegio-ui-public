import {
  createCorePhoneCodeProps,
  type IAltCorePhoneCodeProps,
} from '~core/ui/phoneCode/models/types'

export interface IAltNgPhoneCodeProps extends Omit<IAltCorePhoneCodeProps, 'readonly'> {}

export const createNgPhoneCodeProps = (): IAltNgPhoneCodeProps => createCorePhoneCodeProps()
