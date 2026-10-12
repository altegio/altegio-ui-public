import {
  createCoreCardButtonExternalProps,
  type IYCoreCardButtonExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IYCoreCardButtonProps extends IYCoreCardButtonExternalProps {}

export const createCoreCardButtonProps = (): IYCoreCardButtonProps => ({ ...createCoreCardButtonExternalProps() })
