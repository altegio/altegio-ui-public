import { createContext } from '@lit/context'
import type { IAltCoreCardWrapperProps } from '~core/ui/cardWrapper/models/types'

export const checkedContextKey = Symbol('CheckedContext')
export const checkedContextCreated = createContext<IAltCoreCardWrapperProps['checked']>(checkedContextKey)

export const disabledContextKey = Symbol('DisabledContext')
export const disabledContextCreated = createContext<IAltCoreCardWrapperProps['disabled']>(disabledContextKey)

export const hoverableContextKey = Symbol('HoverableContext')
export const hoverableContextCreated = createContext<IAltCoreCardWrapperProps['hoverable']>(hoverableContextKey)

export const focusableContextKey = Symbol('FocusableContext')
export const focusableContextCreated = createContext<IAltCoreCardWrapperProps['focusable']>(focusableContextKey)

export const sizeContextKey = Symbol('SizeContext')
export const sizeContextCreated = createContext<IAltCoreCardWrapperProps['size']>(sizeContextKey)
