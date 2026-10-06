import {
  createCoreButtonExternalProps,
  type IYCoreButtonExternalProps,
} from './external'

export * from './external'

export interface IYCoreButtonProps extends IYCoreButtonExternalProps {}

export const createCoreButtonProps = (): IYCoreButtonProps => ({ ...createCoreButtonExternalProps() })
