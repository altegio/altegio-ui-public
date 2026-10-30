import {
  createCoreFieldIconProps,
  type IAltCoreFieldIconProps,
} from '~core/ui/fieldIcon/models/types'

export interface IAltNgFieldIconProps extends IAltCoreFieldIconProps {}

export const createNgFieldIconProps = (): IAltNgFieldIconProps => createCoreFieldIconProps()
