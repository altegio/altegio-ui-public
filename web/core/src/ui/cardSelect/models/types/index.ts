import {
  createCoreCardSelectExternalProps,
  type IYCoreCardSelectExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IYCoreCardSelectProps extends IYCoreCardSelectExternalProps {}

export const createCoreCardSelectProps = (): IYCoreCardSelectProps => ({ ...createCoreCardSelectExternalProps() })
