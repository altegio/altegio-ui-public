import { createCoreTabExternalProps, type IAltCoreTabExternalProps } from '~core/ui/tab/models/types'

export interface IAltNgTabProps extends IAltCoreTabExternalProps {}

export const createNgTabProps = (): IAltNgTabProps => createCoreTabExternalProps()

