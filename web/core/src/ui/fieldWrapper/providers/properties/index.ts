import { createContext } from '@lit/context'
import type { IAltCoreFieldWrapperProps } from '../../models/types'

export const disabledContextKey = Symbol('DisabledContext')
export const disabledContextCreated = createContext<IAltCoreFieldWrapperProps['disabled']>(disabledContextKey)

export const readonlyContextKey = Symbol('ReadonlyContext')
export const readonlyContextCreated = createContext<IAltCoreFieldWrapperProps['readonly']>(readonlyContextKey)

export const errorContextKey = Symbol('ErrorContext')
export const errorContextCreated = createContext<IAltCoreFieldWrapperProps['error']>(errorContextKey)

export const sizeContextKey = Symbol('SizeContext')
export const sizeContextCreated = createContext<IAltCoreFieldWrapperProps['size']>(sizeContextKey)
