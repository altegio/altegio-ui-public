import {
  createCoreStepperExternalProps,
  type IAltCoreStepperExternalProps,
} from './external'
import {
  createCoreStepperInternalProps,
  type IAltCoreStepperInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCoreStepperProps extends IAltCoreStepperExternalProps, IAltCoreStepperInternalProps {}

export const createCoreStepperProps = (): IAltCoreStepperProps => ({
  ...createCoreStepperExternalProps(),
  ...createCoreStepperInternalProps(),
})
