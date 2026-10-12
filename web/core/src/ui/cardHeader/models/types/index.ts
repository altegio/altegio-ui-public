import {
  createCoreCardHeaderExternalProps,
  type IYCoreCardHeaderExternalProps,
} from './external'

export * from './external'

export interface IYCoreCardHeaderProps extends IYCoreCardHeaderExternalProps {}

export const createCoreCardHeaderProps = (): IYCoreCardHeaderProps => ({ ...createCoreCardHeaderExternalProps() })
