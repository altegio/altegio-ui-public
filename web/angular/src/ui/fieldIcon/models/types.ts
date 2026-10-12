import {
  createCoreFieldIconProps,
  type IYCoreFieldIconProps,
} from '~core/ui/fieldIcon/models/types'

export interface IYNgFieldIconProps extends IYCoreFieldIconProps {}

export const createNgFieldIconProps = (): IYNgFieldIconProps => createCoreFieldIconProps()
