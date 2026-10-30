import {
  createCoreCardIconProps,
  type IAltCoreCardIconProps,
} from '~core/ui/cardIcon/models/types'

export interface IAltNgCardIconProps extends IAltCoreCardIconProps {}

export const createNgCardIconProps = (): IAltNgCardIconProps => createCoreCardIconProps()
