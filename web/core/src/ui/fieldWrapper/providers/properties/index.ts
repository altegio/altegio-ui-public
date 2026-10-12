import { createContext } from '@lit/context'
import type { IYCoreFieldWrapperProps } from '../../models/types'

export const disabledContextKey = Symbol('DisabledContext')
export const disabledContextCreated = createContext<IYCoreFieldWrapperProps['disabled']>(disabledContextKey)

export const readonlyContextKey = Symbol('ReadonlyContext')
export const readonlyContextCreated = createContext<IYCoreFieldWrapperProps['readonly']>(readonlyContextKey)

export const errorContextKey = Symbol('ErrorContext')
export const errorContextCreated = createContext<IYCoreFieldWrapperProps['error']>(errorContextKey)

export const sizeContextKey = Symbol('SizeContext')
export const sizeContextCreated = createContext<IYCoreFieldWrapperProps['size']>(sizeContextKey)
