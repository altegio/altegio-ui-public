import {
  createCoreCardSelectExternalProps,
  type IAltCoreCardSelectExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IAltCoreCardSelectProps extends IAltCoreCardSelectExternalProps {}

export const createCoreCardSelectProps = (): IAltCoreCardSelectProps => ({ ...createCoreCardSelectExternalProps() })
