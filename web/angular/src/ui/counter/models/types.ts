import { createCoreCounterProps, type IAltCoreCounterProps } from '~core/ui/counter/models/types'

export type TAltNgCounterProps = IAltCoreCounterProps

export const createNgCounterProps = (): TAltNgCounterProps => {
  return createCoreCounterProps()
}
