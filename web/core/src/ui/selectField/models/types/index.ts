import {
  createCoreSelectFieldExternalProps,
  type IAltCoreSelectFieldExternalProps,
} from './external'


export * from './external'
export * from './events'

export interface IAltCoreSelectFieldProps extends IAltCoreSelectFieldExternalProps {}

export const createCoreSelectFieldProps = (): IAltCoreSelectFieldProps => ({ ...createCoreSelectFieldExternalProps() })
