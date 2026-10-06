import type { IYCorePhoneCodeExternalProps } from './external'
import {
  createCorePhoneCodeExternalProps,
} from './external'


export * from './external'

export interface IYCorePhoneCodeProps extends IYCorePhoneCodeExternalProps {}

export const createCorePhoneCodeProps = (): IYCorePhoneCodeProps => ({ ...createCorePhoneCodeExternalProps() })
