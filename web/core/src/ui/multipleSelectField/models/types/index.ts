import {
  createCoreMultipleSelectFieldExternalProps,
  type IAltCoreMultipleSelectFieldExternalProps,
} from './external'


export * from './external'
export * from './events'

export interface IAltCoreMultipleSelectFieldProps extends IAltCoreMultipleSelectFieldExternalProps {}

export const createCoreMultipleSelectFieldProps = (): IAltCoreMultipleSelectFieldExternalProps => ({ ...createCoreMultipleSelectFieldExternalProps() })
