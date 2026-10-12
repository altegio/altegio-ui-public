import {
  createCoreTipProps,
  type IYCoreTipProps,
} from '~core/ui/tip/models/types'

export interface IYNgTipProps extends IYCoreTipProps {}

export const createNgTipProps = (): IYNgTipProps => createCoreTipProps()
