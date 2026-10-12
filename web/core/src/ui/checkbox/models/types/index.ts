import {
  createCoreCheckboxExternalProps,
  type IYCoreCheckboxExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IYCoreCheckboxProps extends IYCoreCheckboxExternalProps {}

export const createCoreCheckboxProps = (): IYCoreCheckboxProps => ({ ...createCoreCheckboxExternalProps() })
