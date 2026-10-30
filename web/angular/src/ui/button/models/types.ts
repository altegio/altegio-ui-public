import { createCoreButtonProps, type IAltCoreButtonProps } from '~core/ui/button/models/types'

export interface IAltNgButtonProps extends IAltCoreButtonProps {}

export const createNgButtonProps = (): IAltNgButtonProps => createCoreButtonProps()

export * from '~core/ui/button/models/types'
