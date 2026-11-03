import { createContext } from '@lit/context'
import type { AltCoreTab } from '~core/ui/tab'

export interface IAltCoreTablistContext {

  /** Tab that Tab reaches in the tab list: the active one, or the first enabled one */
  tabStop: AltCoreTab | undefined
}

export const tablistContextKey = Symbol('tablistContext')

/** Provided by the tabs to the tabs inside them, so that the tabs expose the tab role */
export const tablistContextCreated = createContext<IAltCoreTablistContext | undefined>(tablistContextKey)
