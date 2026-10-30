import {
  type IAltCoreIconExternalProps,
  createCoreIconExternalProps,
} from './external'

export * from './external'

export interface IAltCoreIconProps extends IAltCoreIconExternalProps {}

export const createCoreIconProps = (): IAltCoreIconProps => ({ ...createCoreIconExternalProps() })
