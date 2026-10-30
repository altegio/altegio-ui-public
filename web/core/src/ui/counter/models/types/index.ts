import {
  createCoreCounterExternalProps,
  type IAltCoreCounterExternalProps,
} from './external'

export * from './external'

export interface IAltCoreCounterProps extends IAltCoreCounterExternalProps {}

export const createCoreCounterProps = (): IAltCoreCounterProps => {
  return { ...createCoreCounterExternalProps() }
}
