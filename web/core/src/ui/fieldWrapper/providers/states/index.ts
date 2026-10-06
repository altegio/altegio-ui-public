import { createContext } from '@lit/context'

export const hoveredContextKey = Symbol('HoveredContext')
export const hoveredContextCreated = createContext<boolean>(hoveredContextKey)

export const focusedContextKey = Symbol('FocusedContext')
export const focusedContextCreated = createContext<boolean>(focusedContextKey)
