import type { IYCoreTabsExternalProps } from '~core/ui/tabs/models/types'
import { createCoreTabsExternalProps } from '~core/ui/tabs/models/types'

export interface IYNgTabsProps extends IYCoreTabsExternalProps {}

export const createNgTabsProps = (): IYNgTabsProps => createCoreTabsExternalProps()
