export interface IAltCoreStepInternalProps {

  /** Set by the stepper: whether the step's content is shown */
  active: boolean
}

export const createCoreStepInternalProps = (): IAltCoreStepInternalProps => ({ active: false })
