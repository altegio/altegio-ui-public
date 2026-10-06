import { createContext } from '@lit/context'
import type { IGlobalContext } from '../index'

export const globalContextKey = Symbol('globalContext')
export const globalContextCreated = createContext<IGlobalContext>(globalContextKey)
