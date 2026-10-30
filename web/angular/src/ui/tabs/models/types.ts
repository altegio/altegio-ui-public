import type { IAltCoreTabsExternalProps } from '~core/ui/tabs/models/types'
import { createCoreTabsExternalProps } from '~core/ui/tabs/models/types'

export interface IAltNgTabsProps extends IAltCoreTabsExternalProps {}

export const createNgTabsProps = (): IAltNgTabsProps => createCoreTabsExternalProps()
