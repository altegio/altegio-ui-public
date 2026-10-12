import {
  createCoreToggleExternalProps,
  type IYCoreToggleExternalProps,
} from './external'

export * from './events'
export * from './external'

export interface IYCoreToggleProps extends IYCoreToggleExternalProps {}

export const createCoreToggleProps = (): IYCoreToggleProps => ({ ...createCoreToggleExternalProps() })
