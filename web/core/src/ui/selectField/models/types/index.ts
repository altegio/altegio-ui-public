import {
  createCoreSelectFieldExternalProps,
  type IYCoreSelectFieldExternalProps,
} from './external'


export * from './external'
export * from './events'

export interface IYCoreSelectFieldProps extends IYCoreSelectFieldExternalProps {}

export const createCoreSelectFieldProps = (): IYCoreSelectFieldProps => ({ ...createCoreSelectFieldExternalProps() })
