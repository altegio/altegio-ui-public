import {
  createCoreCardHeaderExternalProps,
  type IAltCoreCardHeaderExternalProps,
} from './external'

export * from './external'

export interface IAltCoreCardHeaderProps extends IAltCoreCardHeaderExternalProps {}

export const createCoreCardHeaderProps = (): IAltCoreCardHeaderProps => ({ ...createCoreCardHeaderExternalProps() })
