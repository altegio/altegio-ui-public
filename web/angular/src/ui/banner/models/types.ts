import {
  createCoreBannerExternalProps,
  type IAltCoreBannerExternalProps,
} from '~core/ui/banner/models/types'

export interface IAltNgBannerProps extends IAltCoreBannerExternalProps {}

export const createNgBannerProps = (): IAltNgBannerProps => createCoreBannerExternalProps()
