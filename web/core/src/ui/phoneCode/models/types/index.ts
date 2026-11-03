import type { IAltCorePhoneCodeExternalProps } from './external'
import {
  createCorePhoneCodeExternalProps,
} from './external'


export * from './external'

export interface IAltCorePhoneCodeProps extends IAltCorePhoneCodeExternalProps {}

export const createCorePhoneCodeProps = (): IAltCorePhoneCodeProps => ({ ...createCorePhoneCodeExternalProps() })
