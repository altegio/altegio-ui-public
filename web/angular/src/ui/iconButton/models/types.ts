import { createCoreIconButtonExternalProps, type IYCoreIconButtonExternalProps } from '~core/ui/iconButton/models/types'

export interface IYNgIconButtonProps extends IYCoreIconButtonExternalProps {}

export const createNgIconButtonProps = (): IYNgIconButtonProps => createCoreIconButtonExternalProps()
