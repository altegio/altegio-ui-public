import { createContext } from '@lit/context'
import type { IYCoreCardWrapperProps } from '~core/ui/cardWrapper/models/types'

export const checkedContextKey = Symbol('CheckedContext')
export const checkedContextCreated = createContext<IYCoreCardWrapperProps['checked']>(checkedContextKey)

export const disabledContextKey = Symbol('DisabledContext')
export const disabledContextCreated = createContext<IYCoreCardWrapperProps['disabled']>(disabledContextKey)

export const hoverableContextKey = Symbol('HoverableContext')
export const hoverableContextCreated = createContext<IYCoreCardWrapperProps['hoverable']>(hoverableContextKey)

export const focusableContextKey = Symbol('FocusableContext')
export const focusableContextCreated = createContext<IYCoreCardWrapperProps['focusable']>(focusableContextKey)

export const sizeContextKey = Symbol('SizeContext')
export const sizeContextCreated = createContext<IYCoreCardWrapperProps['size']>(sizeContextKey)
