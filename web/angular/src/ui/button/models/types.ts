import { createCoreButtonProps, type IYCoreButtonProps } from '~core/ui/button/models/types'

export interface IYNgButtonProps extends IYCoreButtonProps {}

export const createNgButtonProps = (): IYNgButtonProps => createCoreButtonProps()

export * from '~core/ui/button/models/types'
