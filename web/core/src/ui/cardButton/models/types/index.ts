import {
  createCoreCardButtonExternalProps,
  type IAltCoreCardButtonExternalProps,
} from './external'

export * from './external'
export * from './events'

export interface IAltCoreCardButtonProps extends IAltCoreCardButtonExternalProps {}

export const createCoreCardButtonProps = (): IAltCoreCardButtonProps => ({ ...createCoreCardButtonExternalProps() })
