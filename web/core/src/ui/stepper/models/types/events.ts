import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { TAltCoreStepName } from '~core/ui/step/models/types'

export interface IAltCoreStepperChangePayload {
  value: TAltCoreStepName
}

export class StepperChangeEvent extends CustomEvent<IAltCoreStepperChangePayload> {}

export type TAltCoreStepperEvents = TEventsStoryArgs<{ ChangeEvent: typeof StepperChangeEvent }>
