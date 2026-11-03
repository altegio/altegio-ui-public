import type { Middleware, ComputePositionReturn } from '@floating-ui/dom'

export type TAltCoreDropdownPositionCallback = (data: ComputePositionReturn) => Promise<ComputePositionReturn>

export interface IAltCoreDropdownInternalProps {
  middlewares: Middleware[] | undefined
  handlers: TAltCoreDropdownPositionCallback[] | undefined
  strictWidth: boolean | undefined
}

export const createCoreDropdownInternalProps = (): IAltCoreDropdownInternalProps => ({
  middlewares: undefined,
  handlers: undefined,
  strictWidth: false,
})
