import {
  createCoreBannerExternalProps,
  type IAltCoreBannerExternalProps,
} from './external'
import {
  createCoreBannerInternalProps,
  type IAltCoreBannerInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCoreBannerProps extends IAltCoreBannerExternalProps, IAltCoreBannerInternalProps {}

export const createCoreBannerProps = (): IAltCoreBannerProps => ({
  ...createCoreBannerExternalProps(),
  ...createCoreBannerInternalProps(),
})
