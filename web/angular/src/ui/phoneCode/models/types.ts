import {
  createCorePhoneCodeProps,
  type IYCorePhoneCodeProps,
} from '~core/ui/phoneCode/models/types'

export interface IYNgPhoneCodeProps extends Omit<IYCorePhoneCodeProps, 'readonly'> {}

export const createNgPhoneCodeProps = (): IYNgPhoneCodeProps => createCorePhoneCodeProps()
