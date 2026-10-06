import { createContext } from '@lit/context'
import type { IYCoreRadioButtonGroupProps } from '../../models/types'

export const groupValueContextKey = Symbol('GroupValueContext')
export const groupValueContextCreated = createContext<IYCoreRadioButtonGroupProps['value']>(groupValueContextKey)

export const sizeContextKey = Symbol('sizeContext')
export const sizeContextCreated = createContext<IYCoreRadioButtonGroupProps['size']>(sizeContextKey)

export const alignmentContextKey = Symbol('alignmentContext')
export const alignmentContextCreated = createContext<IYCoreRadioButtonGroupProps['alignment']>(alignmentContextKey)
