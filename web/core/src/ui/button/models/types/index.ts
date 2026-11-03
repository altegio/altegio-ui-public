import {
  createCoreButtonExternalProps,
  type IAltCoreButtonExternalProps,
} from './external'

export * from './external'

export interface IAltCoreButtonProps extends IAltCoreButtonExternalProps {}

export const createCoreButtonProps = (): IAltCoreButtonProps => ({ ...createCoreButtonExternalProps() })
