import type { Middleware, ComputePositionReturn } from '@floating-ui/dom'

export type TYCoreDropdownPositionCallback = (data: ComputePositionReturn) => Promise<ComputePositionReturn>

export interface IYCoreDropdownInternalProps {
  middlewares: Middleware[] | undefined
  handlers: TYCoreDropdownPositionCallback[] | undefined
  strictWidth: boolean | undefined
}

export const createCoreDropdownInternalProps = (): IYCoreDropdownInternalProps => ({
  middlewares: undefined,
  handlers: undefined,
  strictWidth: false,
})
