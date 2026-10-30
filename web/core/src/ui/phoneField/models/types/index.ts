import {
  createCorePhoneFieldExternalProps,
  type IAltCorePhoneFieldExternalProps,
} from './external'


export * from './external'
export * from './events'

export interface IAltCorePhoneFieldProps extends IAltCorePhoneFieldExternalProps {}

export const createCorePhoneFieldProps = (): IAltCorePhoneFieldProps => ({ ...createCorePhoneFieldExternalProps() })
