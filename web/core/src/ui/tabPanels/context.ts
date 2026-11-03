import { createContext } from '@lit/context'
import type { TAltCoreTabPanelName } from '~core/ui/tabPanels/models/types'

export const tabPanelsValueContextKey = Symbol('TabPanelsValueContext')
export const tabPanelsValueContextCreated = createContext<TAltCoreTabPanelName | undefined>(tabPanelsValueContextKey)
