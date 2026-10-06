import {
  createCoreMultipleSelectFieldExternalProps,
  type IYCoreMultipleSelectFieldExternalProps,
} from './external'


export * from './external'
export * from './events'

export interface IYCoreMultipleSelectFieldProps extends IYCoreMultipleSelectFieldExternalProps {}

export const createCoreMultipleSelectFieldProps = (): IYCoreMultipleSelectFieldExternalProps => ({ ...createCoreMultipleSelectFieldExternalProps() })
