import { createCoreCounterProps, type IYCoreCounterProps } from '~core/ui/counter/models/types'

export type TYNgCounterProps = IYCoreCounterProps

export const createNgCounterProps = (): TYNgCounterProps => {
  return createCoreCounterProps()
}
