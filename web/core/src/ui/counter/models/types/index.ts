import {
  createCoreCounterExternalProps,
  type IYCoreCounterExternalProps,
} from './external'

export * from './external'

export interface IYCoreCounterProps extends IYCoreCounterExternalProps {}

export const createCoreCounterProps = (): IYCoreCounterProps => {
  return { ...createCoreCounterExternalProps() }
}
