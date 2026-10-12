import {
  createCoreCardIconExternalProps,
  type IYCoreCardIconExternalProps,
} from './external'

export * from './external'

export interface IYCoreCardIconProps extends IYCoreCardIconExternalProps {}

export const createCoreCardIconProps = (): IYCoreCardIconProps => ({ ...createCoreCardIconExternalProps() })
