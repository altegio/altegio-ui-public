import {
  createCoreStepperExternalProps,
  type IAltCoreStepperExternalProps,
} from '~core/ui/stepper/models/types'

export interface IAltNgStepperProps extends IAltCoreStepperExternalProps {}

export const createNgStepperProps = (): IAltNgStepperProps => createCoreStepperExternalProps()
