import { createCoreIconExternalProps, type IAltCoreIconExternalProps } from '~core/ui/icon/models/types'

export interface IAltNgIconProps extends IAltCoreIconExternalProps {}

export const createNgIconProps = (): IAltNgIconProps => createCoreIconExternalProps()
