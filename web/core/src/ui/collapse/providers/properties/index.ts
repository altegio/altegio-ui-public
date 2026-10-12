import { createContext } from '@lit/context'
import type { IYCoreCollapseProps } from '../../models/types'

export const valueContextKey = Symbol('ValueContext')
export const valueContextCreated = createContext<IYCoreCollapseProps['value']>(valueContextKey)

export const typeContextKey = Symbol('TypeContext')
export const typeContextCreated = createContext<IYCoreCollapseProps['type']>(typeContextKey)

export const variantContextKey = Symbol('VariantContext')
export const variantContextCreated = createContext<IYCoreCollapseProps['variant']>(variantContextKey)
