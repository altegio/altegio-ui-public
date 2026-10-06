import {
  createCoreCardIconProps,
  type IYCoreCardIconProps,
} from '~core/ui/cardIcon/models/types'

export interface IYNgCardIconProps extends IYCoreCardIconProps {}

export const createNgCardIconProps = (): IYNgCardIconProps => createCoreCardIconProps()
