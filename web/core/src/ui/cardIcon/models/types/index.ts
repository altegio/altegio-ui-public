import {
  createCoreCardIconExternalProps,
  type IAltCoreCardIconExternalProps,
} from './external'

export * from './external'

export interface IAltCoreCardIconProps extends IAltCoreCardIconExternalProps {}

export const createCoreCardIconProps = (): IAltCoreCardIconProps => ({ ...createCoreCardIconExternalProps() })
