import {
  createCoreErrorExternalProps,
  type IAltCoreErrorExternalProps,
} from './external'

export * from './external'

export interface IAltCoreErrorProps extends IAltCoreErrorExternalProps {}

export const createCoreErrorProps = (): IAltCoreErrorProps => ({ ...createCoreErrorExternalProps() })
