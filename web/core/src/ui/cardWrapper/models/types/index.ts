import {
  createCoreCardWrapperExternalProps,
  type IAltCoreCardWrapperExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IAltCoreCardWrapperProps extends IAltCoreCardWrapperExternalProps {}

export const createCoreCardWrapperProps = (): IAltCoreCardWrapperProps => ({ ...createCoreCardWrapperExternalProps() })
