import { createCoreIconButtonExternalProps, type IAltCoreIconButtonExternalProps } from '~core/ui/iconButton/models/types'

export interface IAltNgIconButtonProps extends IAltCoreIconButtonExternalProps {}

export const createNgIconButtonProps = (): IAltNgIconButtonProps => createCoreIconButtonExternalProps()
