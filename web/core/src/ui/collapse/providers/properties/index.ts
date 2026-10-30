import { createContext } from '@lit/context'
import type { IAltCoreCollapseProps } from '../../models/types'

export const valueContextKey = Symbol('ValueContext')
export const valueContextCreated = createContext<IAltCoreCollapseProps['value']>(valueContextKey)

export const typeContextKey = Symbol('TypeContext')
export const typeContextCreated = createContext<IAltCoreCollapseProps['type']>(typeContextKey)

export const variantContextKey = Symbol('VariantContext')
export const variantContextCreated = createContext<IAltCoreCollapseProps['variant']>(variantContextKey)
