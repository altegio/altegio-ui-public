import {
  createCoreStepExternalProps,
  type IAltCoreStepExternalProps,
} from './external'
import {
  createCoreStepInternalProps,
  type IAltCoreStepInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreStepProps extends IAltCoreStepExternalProps, IAltCoreStepInternalProps {}

export const createCoreStepProps = (): IAltCoreStepProps => ({
  ...createCoreStepExternalProps(),
  ...createCoreStepInternalProps(),
})
