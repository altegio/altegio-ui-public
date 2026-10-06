import {
  createCoreCardWrapperExternalProps,
  type IYCoreCardWrapperExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IYCoreCardWrapperProps extends IYCoreCardWrapperExternalProps {}

export const createCoreCardWrapperProps = (): IYCoreCardWrapperProps => ({ ...createCoreCardWrapperExternalProps() })
