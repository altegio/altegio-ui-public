import {
  createCoreTipProps,
  type IAltCoreTipProps,
} from '~core/ui/tip/models/types'

export interface IAltNgTipProps extends IAltCoreTipProps {}

export const createNgTipProps = (): IAltNgTipProps => createCoreTipProps()
