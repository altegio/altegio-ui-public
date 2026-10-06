import { createCoreIconExternalProps, type IYCoreIconExternalProps } from '~core/ui/icon/models/types'

export interface IYNgIconProps extends IYCoreIconExternalProps {}

export const createNgIconProps = (): IYNgIconProps => createCoreIconExternalProps()
