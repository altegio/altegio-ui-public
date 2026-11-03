import {
  createCoreStepperProps,
  type IAltCoreStepperProps,
} from '~core/ui/stepper/models/types'
import type { TAltCoreStepName } from '~core/ui/step/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueStepperProps {
  modelValue?: IAltCoreStepperProps['value']
  orientation?: IAltCoreStepperProps['orientation']
  headerNav?: IAltCoreStepperProps['headerNav']
  accessibleName?: IAltCoreStepperProps['accessibleName']
}

export interface IAltVueStepperEmits {
  (event: 'update:modelValue', value: TAltCoreStepName): void
}

export const createVueStepperProps = (): TDefinedVueProps<IAltVueStepperProps> => {
  const { value, orientation, headerNav, accessibleName } = createCoreStepperProps()

  return {
    modelValue: value,
    orientation,
    headerNav,
    accessibleName,
  }
}
