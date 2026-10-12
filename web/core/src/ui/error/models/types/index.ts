import {
  createCoreErrorExternalProps,
  type IYCoreErrorExternalProps,
} from './external'

export * from './external'

export interface IYCoreErrorProps extends IYCoreErrorExternalProps {}

export const createCoreErrorProps = (): IYCoreErrorProps => ({ ...createCoreErrorExternalProps() })
