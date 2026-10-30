import {
  createCoreFieldIconExternalProps,
  type IAltCoreFieldIconExternalProps,
} from './external'
import {
  createCoreFieldIconInternalProps,
  type IAltCoreFieldIconInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreFieldIconProps extends IAltCoreFieldIconExternalProps, IAltCoreFieldIconInternalProps {}

export const createCoreFieldIconProps = (): IAltCoreFieldIconProps => ({
  ...createCoreFieldIconExternalProps(),
  ...createCoreFieldIconInternalProps(),
})
