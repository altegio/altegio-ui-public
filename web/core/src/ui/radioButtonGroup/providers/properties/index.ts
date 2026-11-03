import { createContext } from '@lit/context'
import type { IAltCoreRadioButtonGroupProps } from '../../models/types'

export const groupValueContextKey = Symbol('GroupValueContext')
export const groupValueContextCreated = createContext<IAltCoreRadioButtonGroupProps['value']>(groupValueContextKey)

export const sizeContextKey = Symbol('sizeContext')
export const sizeContextCreated = createContext<IAltCoreRadioButtonGroupProps['size']>(sizeContextKey)

export const tabStopValueContextKey = Symbol('tabStopValueContext')

/** Value of the radio button that Tab reaches in the group: the checked one, or the first enabled one */
export const tabStopValueContextCreated = createContext<IAltCoreRadioButtonGroupProps['value']>(tabStopValueContextKey)

export const requiredContextKey = Symbol('requiredContext')

/** Whether the group requires a checked radio button for form submission */
export const requiredContextCreated = createContext<IAltCoreRadioButtonGroupProps['required']>(requiredContextKey)

export const alignmentContextKey = Symbol('alignmentContext')
export const alignmentContextCreated = createContext<IAltCoreRadioButtonGroupProps['alignment']>(alignmentContextKey)
