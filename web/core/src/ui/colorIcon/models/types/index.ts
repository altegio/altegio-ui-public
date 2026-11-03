import {
  createCoreColorIconExternalProps,
  type IAltCoreColorIconExternalProps,
} from './external'

export * from './external'

export interface IAltCoreColorIconProps extends IAltCoreColorIconExternalProps {}

export const createCoreColorIconProps = (): IAltCoreColorIconProps => ({ ...createCoreColorIconExternalProps() })
