import { createContext } from '@lit/context'
import type { IAltCoreRadioButtonGroupProps } from '../../models/types'

export const groupValueContextKey = Symbol('GroupValueContext')
export const groupValueContextCreated = createContext<IAltCoreRadioButtonGroupProps['value']>(groupValueContextKey)

export const sizeContextKey = Symbol('sizeContext')
export const sizeContextCreated = createContext<IAltCoreRadioButtonGroupProps['size']>(sizeContextKey)

export const alignmentContextKey = Symbol('alignmentContext')
export const alignmentContextCreated = createContext<IAltCoreRadioButtonGroupProps['alignment']>(alignmentContextKey)
