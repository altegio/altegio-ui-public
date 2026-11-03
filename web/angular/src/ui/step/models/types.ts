import {
  createCoreStepExternalProps,
  type IAltCoreStepExternalProps,
} from '~core/ui/step/models/types'

export interface IAltNgStepProps extends IAltCoreStepExternalProps {}

export const createNgStepProps = (): IAltNgStepProps => createCoreStepExternalProps()
