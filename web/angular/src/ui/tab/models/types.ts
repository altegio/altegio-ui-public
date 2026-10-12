import { createCoreTabExternalProps, type IYCoreTabExternalProps } from '~core/ui/tab/models/types'

export interface IYNgTabProps extends IYCoreTabExternalProps {}

export const createNgTabProps = (): IYNgTabProps => createCoreTabExternalProps()

