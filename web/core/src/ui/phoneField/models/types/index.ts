import {
  createCorePhoneFieldExternalProps,
  type IYCorePhoneFieldExternalProps,
} from './external'


export * from './external'
export * from './events'

export interface IYCorePhoneFieldProps extends IYCorePhoneFieldExternalProps {}

export const createCorePhoneFieldProps = (): IYCorePhoneFieldProps => ({ ...createCorePhoneFieldExternalProps() })
